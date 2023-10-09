import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Buffer } from 'buffer';

// Make Buffer globally available for the entire application
window.Buffer = Buffer;

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
} else {
  throw new Error("Root element not found");
}
