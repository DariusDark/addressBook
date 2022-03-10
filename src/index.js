import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactGA from 'react-ga4';
import { Provider } from 'react-redux';
import store from './store/Store.jsx';

const TRACKING_ID = 'G-DZ2W3DE56N';
ReactGA.initialize(TRACKING_ID);
ReactGA.send('pageview');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);