import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';
import useToken from '../hooks/useToken';
import useWebSocket from '../hooks/useWebSocket';
import { importPrivateKey } from '../utils/crypto';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useToken();
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [keysLoaded, setKeysLoaded] = useState(false);
  const socketInstance = useWebSocket(token);

  useEffect(() => {
    setSocket(socketInstance);
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser({ id: decodedUser.id, username: decodedUser.username });
      const storedPrivateKey = localStorage.getItem('privateKey');
      if (storedPrivateKey) {
        importPrivateKey(storedPrivateKey).then((importedPrivateKey) => {
          setPrivateKey(importedPrivateKey);
          setKeysLoaded(true);
        });
      } else {
        setKeysLoaded(true);
      }
    } else {
      setUser(null);
      setKeysLoaded(true);
    }
  }, [token, socketInstance]);

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    if (socket) {
      socket.close();
    }
    setSocket(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user, socket, setSocket, privateKey, keysLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
