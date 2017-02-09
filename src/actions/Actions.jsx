import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  ADD_FAVORITE,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_USER,
  CAMPGROUND_DELETE,
  CAMPGROUND_EDIT,
  // DELETE_FAVORITE,
  FETCH_CAMPGROUND,
  FETCH_CAMPGROUND_COMMENTS,
  FETCH_CAMPGROUNDS,
  FETCH_MESSAGE,
  FETCH_WEATHER,
  SET_COMMENT_TEXT,
  SET_SEARCH_TEXT,
  SET_SIGNEDIN_USER,
  SIGNIN_MODAL,
  SIGNUP_MODAL,
  UPDATE_FAVORITES,
  UNAUTH_USER
} from './Types';

import {
  WEATHER_URL
} from './config/OpenWeatherMapAPI';

const ROOT_URL = 'http://localhost:3001';

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


export function setSearchText(searchText) {
  return {
    type: SET_SEARCH_TEXT,
    payload: searchText
  };
};


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
    axios.get(`${ROOT_URL}/campgrounds/${id}`, {
      headers: { authorization: localStorage.getItem('token') }
    })
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
        type: FETCH_CAMPGROUND_COMMENTS,
        payload: response.data.campground.comments
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
    })
    .catch(({ response }) => {
      if (response.status === 500) {
        dispatch(authError('There was an internal server error with OpenWeatherMap.org, please try again later!'));
      }
    });
  }
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
      dispatch(fetchFavorites({ userId }));
      // browserHistory.push('/campgrounds');
    })
      .catch(({ response }) => dispatch(authError(response.data.err)));
  };
}

export function fetchFavorites({ userId }) {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/favorites/${userId}`)
    .then(response => {
      dispatch({ type: ADD_FAVORITE, payload: response.data.favorites});
    })
    .catch(({ response }) => dispatch(authError(response.data.err)));
  }
}

export function deleteFavorite({ userId, favoriteId }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/favorites/delete/${favoriteId}`, {userId, favoriteId })
    .then(response => {
      dispatch(fetchFavorites({ userId }));
    })
    .catch(({ response }) => dispatch(authError(response.data.err)));
  }
}

//==========================================================================
// Campground Create, Update, Delete
//==========================================================================

export function addNewCampground({ name, image, description, location, zip, author }) {
  return function(dispatch) {
    const config = {
      headers: { authorization: localStorage.getItem('token') }
    };
    // Submit email/password to server
    axios.post(`${ROOT_URL}/campgrounds/new`, { name, image, description, location, zip, author }, config)
    .then(response => {
      dispatch(authSuccess(response.data.message));
      browserHistory.push('/campgrounds');
    })
      .catch(({ response }) => dispatch(authError(response.data.err)));
  };
}

export function editCampground({ id, name, image, description, location, zip }) {
  return function(dispatch) {
    const config = {
      headers: { authorization: localStorage.getItem('token') }
    };
    // Submit email/password to server
    axios.put(`${ROOT_URL}/campgrounds/edit/:id`, { id, name, image, description, location, zip }, config)
    .then(response => {
      dispatch(authSuccess(response.data.updatedCampground));
      browserHistory.goBack();
    })
    .catch(({ response }) => dispatch(authError(response.data.err)));
  };
}

export function deleteCampground(id) {
  const config = {
    headers: { authorization: localStorage.getItem('token') }
  };
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/campgrounds/delete/${id}`, config)
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
  const config = {
    headers: { authorization: localStorage.getItem('token') }
  };
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signedin`, { userId: id }, config)
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
      console.log(response);
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
    const config = {
      headers: { authorization: localStorage.getItem('token') }
    };
    // Submit email/password to server
    axios.post(`${ROOT_URL}/campgrounds/${id}/comment/new`, { comment, id }, config)
    .then(response => {
      dispatch(fetchCampgroundWithUpdatedComments(id));
      // dispatch(authSuccess(response.data.message));
    })
    .catch(({ response }) => dispatch(authError(response.data.err)));
  }
}

export function setCommentText(comment) {
  return {
    type: SET_COMMENT_TEXT,
    payload: comment
  }
}

export function editComment({ commentId, comment, campgroundId }) {
  return function(dispatch) {
    const config = {
      headers: { authorization: localStorage.getItem('token') }
    };
    // Submit email/password to server
    axios.put(`${ROOT_URL}/campgrounds/${campgroundId}/comment/edit/${commentId}`, { commentId, comment }, config)
    .then(response => {
      dispatch(setCommentText(''));
      dispatch(fetchCampgroundWithUpdatedComments(campgroundId));
      dispatch(authSuccess(response.data.message));
      browserHistory.goBack();
    })
    .catch(({ response }) => dispatch(authError(response.data.err)));
  };
}

export function deleteComment({ campgroundId, commentId }) {
  return function(dispatch) {
    const config = {
      headers: { authorization: localStorage.getItem('token') }
    };
    axios.post(`${ROOT_URL}/campgrounds/${campgroundId}/comment/delete/${commentId}`, { campgroundId, commentId }, config)
    .then(response => {
      dispatch(fetchCampgroundWithUpdatedComments(campgroundId));
      // dispatch(authSuccess(response.data.message));
    })
    .catch(({ response }) => dispatch(authError(response.data.err)));
  }
}
