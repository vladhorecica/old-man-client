import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';

import App from "./App.js";


ReactDOM.render(
  <Provider store={configureStore()}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
