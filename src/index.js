import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/Store.jsx';
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);