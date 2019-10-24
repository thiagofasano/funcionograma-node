import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import './config/ReactotronConfig';

import store from './store';
import Routes from './routes';
import GloblStyle from './styles/global';

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes />
        <GloblStyle />
        <ToastContainer autoClose={3000} />
      </Provider>
    </>
  );
}

export default App;
