import { Auth as CognitoAuth } from '@aws-amplify/auth';
import { Hub, HubCallback } from '@aws-amplify/core';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { createContext, ReactNode, useContext, useState } from 'react';
import useAsyncEffect from 'use-async-effect';

CognitoAuth.configure({
  endpoint: 'http://localhost:9229/',
  aws_project_region: 'local',
  userPoolId: 'local_1NR6Eyrw',
  userPoolWebClientId: 'dv80c8pqrbrxeqbcsgcwlstva',
  authenticationFlowType: 'USER_PASSWORD_AUTH',
});

type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
};

/**
 * Turns a {@link CognitoUser} into a {@link User}.
 *
 * @param cognitoUser - The CognitoUser.
 * @returns A {@link Promise<User>} from the {@link cognitoUser}.
 */
async function cognitoUserToUser(cognitoUser: CognitoUser): Promise<User> {
  const attrList = await CognitoAuth.userAttributes(cognitoUser);
  const attrs = Object.fromEntries(
    attrList.map((attr) => [attr.getName(), attr.getValue()]),
  );
  return {
    id: cognitoUser.getUsername(),
    name: attrs.name,
    email: attrs.email,
    phoneNumber: attrs.phoneNumber,
    country: attrs['custom:country'],
  };
}

type Auth = ReturnType<typeof useProvideAuth>;

/**
 * A {@link Context} for authentication.
 *
 * @remarks
 * Although the context is of {@link Auth} type or `null`, that's only because we can't provide
 * a sensible default on creation. However when calling {@link useAuth} this will never be
 * `null`.
 */
const AuthContext = createContext<Auth | null>(null);

/**
 * Provider component that wraps the app and makes an {@link Auth} object
 * available to any child component that calls {@link useAuth}. The `Auth` object
 * will never be `null`;
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

/**
 * Hook for child components to get the {@link Auth} object and re-render when it changes.
 */
export function useAuth() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return useContext(AuthContext)!;
}

/**
 * {@link email} & {@link password} credentials.
 */
export type Credentials = Pick<User, 'email'> & {
  password: string;
};

/**
 * When a challenge must be passed in order for the user to log-in, {@link CognitoAuth.signIn}
 * returns a {@link CognitoUser} with an additional nullable property called `challengeName`,
 * unfortunately the typings for the `signIn` function don't reflect that, so we made this type
 * to reflect the actual object returned.
 */
type CognitoUserWithChallenge = CognitoUser & {
  challengeName: string | null | undefined;
};

/**
 * Hook to provide the auth primitives ({@link logIn}, {@link logOut}, {@link signUp}, {@link user}
 * and {@link inProgress}) to the app.
 */
function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [authInProgress, setAuthInProgress] = useState(true);

  /** Sign-in using email and password. */
  async function logIn({
    email,
    password,
  }: Credentials): Promise<User | string> {
    const cognitoUser: CognitoUserWithChallenge = await CognitoAuth.signIn(
      email,
      password,
    );
    if (cognitoUser.challengeName) {
      return cognitoUser.challengeName;
    }
    setUser(await cognitoUserToUser(cognitoUser));
    setAuthInProgress(false);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return user!;
  }

  /**
   * Log-out.
   *
   * @param global - if `true` the user will be logged out of all devices.
   */
  async function logOut(global = false) {
    setUser(null);
    await CognitoAuth.signOut({ global });
  }

  /**
   * Sign-up using email, password, name and country.
   *
   * If we get back a confirmed user then we return a {@link User}, `null` otherwise.
   */
  async function signUp({
    email,
    password,
    name,
    phoneNumber,
    country,
  }: Credentials & Exclude<User, 'id'>): Promise<User | null> {
    try {
      const result = await CognitoAuth.signUp({
        username: email,
        password,
        attributes: {
          name,
          phoneNumber,
          'custom:country': country,
        },
      });
      if (result.user != null && result.userConfirmed) {
        setUser(await cognitoUserToUser(result.user));
        return user;
      }
    } catch (error) {
      console.error(`signUp error ${error}`);
    }
    setUser(null);
    return null;
  }

  /**
   * Loads the currently logged in {@link User}.
   */
  async function getUser() {
    try {
      const user: CognitoUserWithChallenge =
        await CognitoAuth.currentAuthenticatedUser();
      if (!user.challengeName) {
        setUser(await cognitoUserToUser(user));
        setAuthInProgress(false);
      }
    } catch (e) {
      setAuthInProgress(false);
    }
  }

  let listener: HubCallback;

  useAsyncEffect(
    async (isMounted) => {
      if (isMounted()) {
        await getUser();
        listener = async (data) => {
          switch (data.payload.event) {
            case 'signOut':
              setUser(null);
              setAuthInProgress(false);
              break;
            case 'tokenRefresh_failure':
            case 'signIn_failure':
              setUser(null);
              setAuthInProgress(false);
              break;
            default:
          }
        };

        Hub.listen('auth', listener);
      }
    },
    () => listener != null && Hub.remove('auth', listener),
    [],
  );

  return {
    user,
    inProgress: authInProgress,
    logIn,
    logOut,
    signUp,
  };
}
