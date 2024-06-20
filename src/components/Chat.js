import { Button, Container, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useAuthGuard from '../hooks/useAuthGuard';
import useMessages from '../hooks/useMessages';
import usePrivateKey from '../hooks/usePrivateKey';

const Chat = () => {
  useAuthGuard();
  const { user, socket, logout } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [receiver, setReceiver] = useState('public');
  const privateKey = usePrivateKey();
  const { messages, users, sendMessage } = useMessages(socket, user, privateKey);

  if (!user || !socket) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Loading...
        </Typography>
      </Container>
    );
  }

  const handleSendMessage = () => {
    sendMessage(newMessage, receiver);
    setNewMessage('');
  };

  const handleUserClick = (clickedUser) => {
    if (clickedUser !== user.id) {
      setReceiver(clickedUser);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handlePublicClick = () => {
    setReceiver('public');
  };

  const getReceiverName = () => {
    if (receiver === 'public') {
      return 'Everyone';
    }
    return users[receiver] || receiver;
  };

  const isPrivateMessage = (message) => {
    return message.receiver !== 'public';
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Chat Room
      </Typography>
      <Button onClick={logout} variant="contained" color="secondary" fullWidth>
        Logout
      </Button>
      <Typography variant="body1" gutterBottom>
        Sending to: {getReceiverName()}
      </Typography>
      <Button onClick={handlePublicClick} variant="outlined" color="primary" fullWidth>
        Send Public Message
      </Button>
      <List>
        {messages.map((message, index) => (
          <ListItem
            key={index}
            alignItems={message.sender === user.id ? 'flex-end' : 'flex-start'}
            style={{
              backgroundColor: isPrivateMessage(message) ? '#ffebee' : message.sender === user.id ? '#e0f7fa' : '#e1bee7',
              borderRadius: '10px',
              padding: '10px',
              margin: '5px 0',
              maxWidth: '80%',
              alignSelf: message.sender === user.id ? 'flex-end' : 'flex-start',
            }}
          >
            <ListItemText
              primary={message.content}
              secondary={
                <span
                  style={{ cursor: message.sender !== user.id ? 'pointer' : 'default' }}
                  onClick={() => handleUserClick(message.sender)}
                >
                  {message.sender === user.id ? 'You' : message.senderName}
                </span>
              }
            />
          </ListItem>
        ))}
      </List>
      <TextField
        label="New Message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button onClick={handleSendMessage} variant="contained" color="primary" fullWidth>
        Send
      </Button>
    </Container>
  );
};

export default Chat;
