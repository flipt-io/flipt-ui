import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
