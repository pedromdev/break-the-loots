import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducers from '../../reducers';

let store = createStore(
  reducers,
  applyMiddleware(reduxThunk)
);

export default <Provider store={store}></Provider>;