import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './utils/theme';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SingUpPage from './pages/SignUp/SignUpPage/SignUpPage';
import { AuthProvider, useAuth } from './hooks/useAuth';
import AuthenticatedOutlet from './components/AuthenticatedOutlet/AuthenticatedOutlet';
import LoginPage from './pages/Login/LoginPage/LoginPage';
import IndexPage from './pages';
import Layout from './components/Layout/Layout';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SingUpPage />} />
            <Route path="/private2" element={<AuthenticatedOutlet />}>
              <Route element={<IndexPage />} />
            </Route>
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <Layout>
                    <App />
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
);

function PrivateRoute({ children }: any) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/" />;
}
