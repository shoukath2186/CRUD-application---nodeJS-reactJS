import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './HandilApp.jsx';
import { Provider } from 'react-redux';
import store from './Store.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Datas from './AdminDatas/datas.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Datas>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </Datas>
  </Provider>
);
