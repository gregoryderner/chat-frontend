let socket;

function initializeWebSocket() {
  const token = localStorage.getItem('token');
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    return socket;
  }

  socket = new WebSocket(`ws://localhost:3000/ws?token=${token}`);

  socket.onopen = () => {
    console.log('Connected to WebSocket server');
  };

  socket.onclose = () => {
    console.log('Disconnected from WebSocket server');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  return socket;
}

function waitForSocketConnection(socket) {
  return new Promise((resolve, reject) => {
    const maxAttempts = 10;
    let attempts = 0;

    const checkReadyState = () => {
      if (socket.readyState === WebSocket.OPEN) {
        resolve();
      } else {
        attempts += 1;
        if (attempts > maxAttempts) {
          reject(new Error('WebSocket connection timed out'));
        } else {
          setTimeout(checkReadyState, 100);
        }
      }
    };

    checkReadyState();
  });
}

export { initializeWebSocket, waitForSocketConnection };
