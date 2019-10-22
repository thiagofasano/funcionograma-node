import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';
import GloblStyle from './styles/global';

function App() {
  return (
    <>
      <Routes />
      <GloblStyle />
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
