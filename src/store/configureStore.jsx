import * as redux from 'redux';
import { reducer as form } from 'redux-form';
import thunk from 'redux-thunk';
import { AUTH_USER } from '../actions/Types';

import {
  authReducer,
  fetchCampgroundsReducer,
  fetchCampgroundReducer,
  fetchWeatherReducer,
  searchTextReducer,
  signinModalStateReducer,
  signupModalStateReducer,
  setSignedinUserReducer
} from '../reducers/Reducers';

export let configure = (initialState = {}) => {
  let reducer = redux.combineReducers({
    form,
    auth: authReducer,
    searchText: searchTextReducer,
    campground: fetchCampgroundReducer,
    campgrounds: fetchCampgroundsReducer,
    signinModalState: signinModalStateReducer,
    signupModalState: signupModalStateReducer,
    signedinUser: setSignedinUserReducer,
    weather: fetchWeatherReducer,
  });

  let store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  const token = localStorage.getItem('token');
  // If we have a token, consider user signed in
  if (token) {
    // update application state, set auth to true
    store.dispatch({ type: AUTH_USER });
  }

  return store;
};
