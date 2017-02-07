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
} from '../actions/Types';

export function addCampgroundReducer(state={}, action) {
  switch (action.type) {
    case CAMPGROUND_SUCCESS:
      return { ...state, error: '', message: action.payload.data};
    case CAMPGROUND_ERROR:
      return { ...state, error: action.payload.data};
  }
  return state;
}

export function authReducer(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error:'', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case AUTH_SUCCESS:
      return { ...state, success: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
  }
  return state;
}

export function commentTextReducer(state='', action) {
  switch (action.type) {
    case SET_COMMENT_TEXT:
      return { ...state, ...action.payload };;
  }
  return state;
}

export function fetchCampgroundReducer(state=[], action) {
  switch (action.type) {
    case FETCH_CAMPGROUND:
      return { ...state, ...action.payload };
    case FETCH_CAMPGROUND_COMMENTS:
      return {
        ...state,
        comments: action.payload
      }
    }
  return state;
}

export function fetchCampgroundsReducer(state={}, action) {
  switch (action.type) {
    case FETCH_CAMPGROUNDS:
      return { ...state, campgrounds: action.payload };
  }
  return state;
}

export function fetchWeatherReducer(state={}, action) {
  switch (action.type) {
    case FETCH_WEATHER:
      return { ...state, weather: action.payload };
  }
  return state;
}

export function searchTextReducer(state = '', action) {
  switch (action.type) {
    case SET_SEARCH_TEXT:
      return action.payload;
  };
  return state;
};

export function signinModalStateReducer(state=false, action) {
  switch(action.type) {
    case SIGNIN_MODAL:
      return !state;
    }
  return state;
}

export function signupModalStateReducer(state=false, action) {
  switch(action.type) {
    case SIGNUP_MODAL:
      return !state;
    }
  return state;
}

export function setSignedinUserReducer(state={}, action) {
  switch (action.type) {
    case SET_SIGNEDIN_USER:
      return { ...state, username: action.payload.user, joinedAt: action.payload.joinedAt, favorites: action.payload.favorites };
    case ADD_FAVORITE:
      return { ...state, favorites: action.payload }
  }
  return state;
}
