import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './shared/styles/CustomTheme';
import { ThemeProvider } from '@emotion/react';

var doc: HTMLElement | null = document.getElementById('root')
const root : any | HTMLElement = ReactDOM.createRoot(doc as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);