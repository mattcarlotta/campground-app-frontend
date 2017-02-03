import axios from 'axios';
import { browserHistory } from 'react-router';
import { reset } from 'redux-form';

import {
  // ADD_FAVORITE,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_USER,
  CAMPGROUND_DELETE,
  CAMPGROUND_EDIT,
  COMMENT_MODAL,
  // DELETE_FAVORITE,
  FETCH_CAMPGROUND,
  FETCH_CAMPGROUNDS,
  FETCH_MESSAGE,
  FETCH_WEATHER,
  RESET_SEARCH_TEXT,
  SET_SEARCH_TEXT,
  SET_SIGNEDIN_USER,
  SIGNIN_MODAL,
  SIGNUP_MODAL,
  UPDATE_FAVORITES,
  UNAUTH_USER
} from './Types';

import {
  API_KEY,
  WEATHER_URL
} from './config/OpenWeatherMapAPI';

const ROOT_URL = 'http://localhost:3001';


export function setSearchText(searchText) {
  return {
    type: SET_SEARCH_TEXT,
    payload: searchText
  };
};

export function resetSearchText(searchText) {
  return {
    type: RESET_SEARCH_TEXT,
    payload: searchText
  }
}

//==========================================================================
// Campground Read
//==========================================================================
export function fetchCampgrounds(){
  return function(dispatch) {
    axios.get(`${ROOT_URL}/campgrounds`)
    .then(response => {
      dispatch({
        type: FETCH_CAMPGROUNDS,
        payload: response.data.campgrounds
      });
    });
  };
}

export function fetchCampground(id){
  return function(dispatch) {
    axios.get(`${ROOT_URL}/campgrounds/${id}`)
    .then(response => {
      dispatch(fetchWeather(response.data.campground.zip));
      dispatch({
        type: FETCH_CAMPGROUND,
        payload: response.data.campground
      });
    })
    .catch(({ response }) => dispatch(authError(response.data.err)));
  };
}

export function fetchCampgroundWithUpdatedComments(id){
  return function(dispatch) {
    axios.get(`${ROOT_URL}/campgrounds/${id}`)
    .then(response => {
      dispatch({
        type: FETCH_CAMPGROUND,
        payload: response.data.campground
      });
    })
    .catch(({ response }) => dispatch(authError(response.data.err)));
  };
}

export function fetchWeather(zip) {
  return function(dispatch) {
    axios.get(`${WEATHER_URL}&zip=${zip},us}`)
    .then(response => {
      dispatch({
        type: FETCH_WEATHER,
        payload: response.data
      });
    });
  };
}

//==========================================================================
// Favorites Create, Delete
//==========================================================================

export function addFavorite({ userId, campgroundId }) {
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/favorites/create`, { userId, campgroundId })
    .then(response => {
      dispatch(authSuccess(response.data.message));
      // browserHistory.push('/campgrounds');
    })
      .catch(({ response }) => dispatch(authError(response.data.err)));
  };
}


//==========================================================================
// Campground Create, Update, Delete
//==========================================================================

export function addNewCampground({ name, image, description, location, zip, author }) {
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/campgrounds/new`, { name, image, description, location, zip, author })
    .then(response => {
      dispatch(authSuccess(response.data.message));
      browserHistory.push('/campgrounds');
    })
      .catch(({ response }) => dispatch(authError(response.data.err)));
  };
}

export function editCampground({ id, name, image, description, location, zip }) {
  return function(dispatch) {
    // Submit email/password to server
    axios.put(`${ROOT_URL}/campgrounds/edit/:id`, { id, name, image, description, location, zip })
    .then(response => {
      dispatch(authSuccess(response.data.updatedCampground));
      browserHistory.goBack();
    })
    .catch(({ response }) => dispatch(authError(response.data.err)));
  };
}

export function deleteCampground(id) {
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/campgrounds/delete/${id}`)
    .then(response => {
      dispatch(authSuccess(response.data.message));
      dispatch({
        type: CAMPGROUND_DELETE
      });
      browserHistory.push('/campgrounds');
    })
    .catch(({ response }) => dispatch(authError(response.data.err)));
  }
}

//==========================================================================
// Authorization
//==========================================================================
export function fetchUser(id) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signedin`, { userId: id })
    .then(response => {
      dispatch({ type: SET_SIGNEDIN_USER, payload: response.data});
    })
    .catch(({ response }) => {
      dispatch(signoutUser());
      dispatch(authError(response.data.err));
    });
  }
}

export function signinModal() {
  return {
    type: SIGNIN_MODAL
  };
}

export function signinUser({ username, password }) {
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/signin`, { username, password })
    .then(response => {
      // If req is good,
      // - Update state to indicate user is auth'd
      dispatch({ type: AUTH_USER });
      dispatch(authSuccess(response.data.message));
      dispatch({ type: SIGNIN_MODAL });
      // - Save JWT token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      // save username to state
      dispatch({ type: SET_SIGNEDIN_USER, payload: response.data});
      // - Redirect to route '/feature'
      // browserHistory.push('/campgrounds');
    })
    .catch(({ response }) => dispatch(authError(`Your username or password is incorrect! Please, try again.`)));
  }
}

export function signupModal() {
  return {
    type: SIGNUP_MODAL
  };
}

export function signupUser({ email, username, password }) {
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/signup`, { email, username, password })
    .then(response => {
      // If req is good,
      // - Update state to indicate user is auth'd
      dispatch({ type: AUTH_USER });
      dispatch(authSuccess(response.data.message));
      dispatch({ type: SIGNUP_MODAL });
      dispatch({ type: SET_SIGNEDIN_USER, payload: response.data});
      // - Save JWT token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      // - Redirect to route '/feature'
      browserHistory.push('/campgrounds');
    })
    .catch(({ response }) => dispatch(authError(response.data.err)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function authSuccess(success) {
  return {
    type: AUTH_SUCCESS,
    payload: success
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  browserHistory.push('/');
  return {
    type: UNAUTH_USER
  };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      });
    });
  }
}

//==========================================================================
// Comment Create, Update, Delete
//==========================================================================

export function addComment({ comment, id }) {
  return function(dispatch) {
    // Submit email/password to server
    axios.post(`${ROOT_URL}/campgrounds/${id}/comments/new`, { comment, id })
    .then(response => {
      dispatch(fetchCampgroundWithUpdatedComments(id));
      // dispatch(authSuccess(response.data.message));
    })
    .catch(({ response }) => dispatch(authError(response.data.err)));
  }
}

export function editCommentModal() {
  return {
    type: COMMENT_MODAL
  };
}

export function editComment({ commentId, comment, id }) {
  return function(dispatch) {
    // Submit email/password to server
    axios.put(`${ROOT_URL}/campgrounds/${id}/comments/edit/${id}`, { commentId, comment })
    .then(response => {
      dispatch(reset('edit_comment'));
      dispatch(fetchCampgroundWithUpdatedComments(id));
      dispatch(editCommentModal());
      dispatch(authSuccess(response.data.message));
    })
    .catch(({ response }) => dispatch(authError(response.data.err)));
  };
}

export function deleteComment({ id, commentId }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/campgrounds/${id}/comments/delete/${commentId}`, { id, commentId })
    .then(response => {
      dispatch(fetchCampgroundWithUpdatedComments(id));
      // dispatch(authSuccess(response.data.message));
    })
    .catch(({ response }) => dispatch(authError(response.data.err)));
  }
}
