import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './utils/theme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingUpPage from './pages/SignUp/SignUpPage/SignUpPage';
import { AuthProvider } from './hooks/useAuth';
import AuthenticatedOutlet from './components/AuthenticatedOutlet/AuthenticatedOutlet';
import LoginPage from './pages/Login/LoginPage/LoginPage';
import IndexPage from './pages';

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
            <Route path="/private" element={<AuthenticatedOutlet />}>
              <Route element={<IndexPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
