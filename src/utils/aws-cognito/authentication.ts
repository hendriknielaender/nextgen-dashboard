import 'cross-fetch';
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global';

const USERPOOL_ID = 'local_1NR6Eyrw';
const IDENTITY_POOL_ID = 'local';

const userPool = new CognitoUserPool({
  endpoint: 'http://localhost:9229/',
  UserPoolId: 'local_1NR6Eyrw',
  ClientId: 'dv80c8pqrbrxeqbcsgcwlstva',
});

export function signInUser({ email, password }: any) {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    authenticateUser(cognitoUser, authenticationDetails)
      .then((userProfileObject) => {
        console.debug(`userProfileObject ${userProfileObject}`);
        resolve(userProfileObject);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function authenticateUser(
  cognitoUser: CognitoUser,
  authenticationDetails: AuthenticationDetails,
) {
  return new Promise<void>((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        localStorage.setItem(
          'user_token',
          result.getAccessToken().getJwtToken(),
        );

        //POTENTIAL: Region needs to be set if not already set previously elsewhere.
        AWS.config.region = 'local';

        const loginsObj = {
          [USERPOOL_ID]: result.getIdToken().getJwtToken(),
        };

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IDENTITY_POOL_ID,
          Logins: {
            // Change the key below according to the specific region your user pool is in.
            local_1NR6Eyrw: result.getIdToken().getJwtToken(),
          },
        });

        //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
        (<AWS.CognitoIdentityCredentials>AWS.config.credentials).refresh(
          (error) => {
            if (error) {
              console.error(error);
            } else {
              // Instantiate aws sdk service objects now that the credentials have been updated.
              // example: var s3 = new AWS.S3();
              console.log('Successfully logged!');
            }
          },
        );

        resolve();
      },
      onFailure: function (err) {
        console.error(err);
        reject(err);
      },
    });
  });
}
