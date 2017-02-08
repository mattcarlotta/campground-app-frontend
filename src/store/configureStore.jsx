import axios from 'axios';
import * as redux from 'redux';
import { reducer as form } from 'redux-form';
import thunk from 'redux-thunk';
//
// import actions from '../actions/Actions';
var actions = require('../actions/Actions');
import { AUTH_USER, SET_SIGNEDIN_USER } from '../actions/Types';

import {
  authReducer,
  commentTextReducer,
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
    campground: fetchCampgroundReducer,
    campgrounds: fetchCampgroundsReducer,
    comment: commentTextReducer,
    searchText: searchTextReducer,
    signinModalState: signinModalStateReducer,
    signupModalState: signupModalStateReducer,
    signedinUser: setSignedinUserReducer,
    weather: fetchWeatherReducer,
  });

  let store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    // window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  const ROOT_URL = 'http://localhost:3001';

  function fetchUser(userId) {
    return function(dispatch) {
      axios.post(`${ROOT_URL}/signedin`, { userId })
      .then(response => {
        dispatch({ type: SET_SIGNEDIN_USER, payload: response.data});
      })
      .catch(({ response }) => {
        dispatch(actions.signoutUser());
        dispatch(actions.authError(response.data.err));
      });
    }
  }

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  // If we have a token, consider user signed in
  if (token) {
    // update application state, set auth to true
    store.dispatch({ type: AUTH_USER });
    store.dispatch(fetchUser(userId));
  }
  console.log(store.getState());
  return store;
};
