import { useEffect, useState } from 'react';
import authService from '../services/authService';
import { decryptMessage, encryptMessage, importPublicKey } from '../utils/crypto';
import { waitForSocketConnection } from '../utils/socket';

const useMessages = (socket, user, privateKey) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    if (!socket || !user) {
      return;
    }

    let isMounted = true;

    socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (isMounted && data.type === 'message') {
        let messageContent = data.content;

        if (data.receiver !== 'public' && data.receiver === user.id) {
          if (privateKey) {
            try {
              messageContent = await decryptMessage(privateKey, data.content);
            } catch (error) {
              console.error("Error decrypting message: ", error);
            }
          } else {
            console.error("Private key not loaded");
          }
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          { ...data, content: messageContent },
        ]);

        setUsers((prevUsers) => {
          if (!prevUsers[data.sender]) {
            return { ...prevUsers, [data.sender]: data.senderName };
          }
          return prevUsers;
        });
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      isMounted = false;
    };
  }, [socket, privateKey, user]);

  const sendMessage = async (newMessage, receiver) => {
    if (newMessage.trim() === '' || !socket || !user) return;

    try {
      await waitForSocketConnection(socket);

      if (socket.readyState !== WebSocket.OPEN) {
        console.error('WebSocket is not open. readyState:', socket.readyState);
        return;
      }

      let messageContent = newMessage;

      if (receiver !== 'public') {
        const receiverPublicKey = await authService.getPublicKey(receiver);
        const importedReceiverPublicKey = await importPublicKey(receiverPublicKey);
        messageContent = await encryptMessage(importedReceiverPublicKey, newMessage);
      }

      const message = {
        type: 'message',
        content: messageContent,
        sender: user.id,
        receiver,
      };

      console.log('Sending message:', message);
      socket.send(JSON.stringify(message));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return { messages, users, sendMessage };
};

export default useMessages;
