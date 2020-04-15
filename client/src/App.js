import React from 'react';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from 'emotion-theming';
import theme from './theme';
import io from 'socket.io-client';

const SocketPort = process.env.SOCKET_PORT || 4000;

function App() {
  io('http://localhost:' + SocketPort);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div>Hello React World</div>
    </ThemeProvider>
  );
}

export default App;
