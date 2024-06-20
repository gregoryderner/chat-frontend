import { useEffect, useState } from 'react';
import { initializeWebSocket, waitForSocketConnection } from '../utils/socket';

const useWebSocket = (token) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (token && !socket) {
      const socketInstance = initializeWebSocket(token);
      waitForSocketConnection(socketInstance)
        .then(() => {
          console.log('WebSocket connected');
          setSocket(socketInstance);
        })
        .catch((error) => {
          console.error('WebSocket connection failed', error);
        });
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [token, socket]);

  return socket;
};

export default useWebSocket;
