import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default App;
