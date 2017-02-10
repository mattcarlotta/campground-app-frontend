//================================================================
// REQUIRED MODULES & COMPONENTS
//================================================================
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import promise from 'redux-promise';

import routes from './routes/Routes';
var store = require('./store/configureStore').configure();

// Load foundation
$(document).foundation();

// app scss style sheets
require('style!css!sass!applicationStyles');

//================================================================
// RENDER DOM
//================================================================
ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>
  , document.getElementById('app')
);
