import axios from 'axios';
import { generateKeyPair } from '../utils/crypto';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/auth';

const register = async (username, password) => {
  try {
    // Generate key pair
    const { publicKey, privateKey } = await generateKeyPair();
    
    const response = await axios.post(`${API_URL}/register`, { username, password, publicKey });

    // Store private key in localStorage
    localStorage.setItem('privateKey', privateKey);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

const storePublicKey = async (userId, publicKey) => {
  try {
    const response = await axios.post(`${API_URL}/storePublicKey`, { userId, publicKey });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Storing public key failed');
  }
};

const getPublicKey = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/publicKey/${userId}`);
    return response.data.publicKey;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Fetching public key failed');
  }
};

const authService = {
  register,
  login,
  storePublicKey,
  getPublicKey,
};

export default authService;
