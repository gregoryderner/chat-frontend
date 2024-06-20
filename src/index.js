import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from 'react-router-dom';
import App from './App.js';
import Login from './components/Auth/Login.js';
import Register from './components/Auth/Register.js';
import Chat from './components/Chat.js';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import './index.css';
import reportWebVitals from './reportWebVitals';
import theme from './theme.js';

const ProtectedRoute = ({ element }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (token) {
    return <Navigate to="/chat" state={{ from: location }} replace />;
  }

  return element;
};

const PrivateRoute = ({ element }) => {
  const { token } = useAuth();
  const location = useLocation();

  return token ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<Navigate to="/login" />} />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "register", element: <ProtectedRoute element={<Register />} /> },
      { path: "login", element: <ProtectedRoute element={<Login />} /> },
      { path: "chat", element: <PrivateRoute element={<Chat />} /> },
      { path: "*", element: <ProtectedRoute element={<Navigate to="/login" />} /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
