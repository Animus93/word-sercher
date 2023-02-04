import React from 'react';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import ReactDOM from 'react-dom/client';
import { App } from 'components/App/App';
import './index.css';
import { Provider } from 'react-redux';
import store, { presistor } from 'Redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
<Provider store={store}>
  <PersistGate loading={null} persistor={presistor}>
  <App />
  </PersistGate>
</Provider>
   // </React.StrictMode> 
);