import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import { generateKeyPair } from '../../utils/crypto';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    try {
      const { publicKey, privateKey } = await generateKeyPair();
      localStorage.setItem('privateKey', privateKey);
      await authService.register(username, password, publicKey);
      setMessage('Registration successful!');
    } catch (error) {
      const errorMessage = error.message || 'Registration failed. Please try again.';
      setMessage(`Registration failed: ${errorMessage}`);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>Register</Typography>
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
        <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
      </form>
      {message && <Typography variant="body2" color="error">{message}</Typography>}
      <Typography variant="body2">
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </Container>
  );
};

export default Register;
