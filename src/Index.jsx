//================================================================
// REQUIRED MODULES & COMPONENTS
//================================================================
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import * as actions from './actions/Actions';
import { AUTH_USER, SET_SIGNEDIN_USER } from './actions/Types';
import routes from './routes/Routes';
import reducer from './reducers/index'

//================================================================
// FOUNDATION STUFF
//================================================================
// Load foundation
$(document).foundation();

// app scss style sheets
require('style!css!sass!applicationStyles');

//================================================================
// CONFIGURE REDUX STORE
//================================================================
let store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

// If we have a token, consider user signed in
if (token) {
  // update application state, set auth to true
  store.dispatch({ type: AUTH_USER });
  store.dispatch(actions.fetchUser(userId));
}


//================================================================
// RENDER DOM
//================================================================
ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>
  , document.getElementById('app')
);
