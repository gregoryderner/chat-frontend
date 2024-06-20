import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import { generateKeyPair } from '../utils/crypto';
import { initializeWebSocket, waitForSocketConnection } from '../utils/socket';

const useAuthHandler = () => {
  const [message, setMessage] = useState('');
  const { login, setSocket } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/chat';

  const handleLogin = async (formData) => {
    const { username, password } = formData;
    try {
      const response = await authService.login(username, password);
      console.log(response)
      const { token, user } = response;

      login(token);
      setMessage('Login successful!');

      // Check if the user already has a public key
      const existingPublicKey = await authService.getPublicKey(user.id);
      if (!existingPublicKey) {
        // Generate key pair and send public key to server
        const { publicKey, privateKey } = await generateKeyPair();
        localStorage.setItem('privateKey', privateKey);
        await authService.storePublicKey(user.id, publicKey);
      }

      // Establish WebSocket connection
      const socket = initializeWebSocket();
      await waitForSocketConnection(socket);
      setSocket(socket);

      navigate(from, { replace: true });
    } catch (error) {
      console.log(error)
      const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
      setMessage(`Login failed: ${errorMessage}`);
    }
  };

  return { handleLogin, message };
};

export default useAuthHandler;
