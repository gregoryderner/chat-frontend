import { Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useAuthHandler from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';

const Login = () => {
  const [formData, handleChange] = useForm({ username: '', password: '' });
  const { handleLogin, message } = useAuthHandler();
  const { keysLoaded } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(formData);
  };

  if (!keysLoaded) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
      </form>
      {message && <Typography variant="body2" color="error">{message}</Typography>}
      <Typography variant="body2">
        Don't have an account? <Link to="/register">Register</Link>
      </Typography>
    </Container>
  );
};

export default Login;
