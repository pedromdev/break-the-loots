import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducers from '../../reducers';

import App from './app';

let store = createStore(
  reducers,
  applyMiddleware(reduxThunk)
);

const providerComponent = (<Provider store={store}>
  <App />
</Provider>);

export default providerComponent;