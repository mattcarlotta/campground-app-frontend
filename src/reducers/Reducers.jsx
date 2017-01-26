import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_USER,
  CAMPGROUND_DELETE,
  CAMPGROUND_EDIT,
  COMMENT_MODAL,
  FETCH_CAMPGROUND,
  FETCH_CAMPGROUNDS,
  FETCH_MESSAGE,
  FETCH_WEATHER,
  RESET_SEARCH_TEXT,
  SET_SEARCH_TEXT,
  SET_SIGNEDIN_USER,
  SIGNIN_MODAL,
  SIGNUP_MODAL,
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

export function fetchCampgroundReducer(state=[], action) {
  switch (action.type) {
    case FETCH_CAMPGROUND:
      return { ...state, campground: action.payload };
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
    case RESET_SEARCH_TEXT:
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

export function editCommentModalStateReducer(state=false, action) {
  switch(action.type) {
    case COMMENT_MODAL:
      return !state;
    }
  return state;
}


export function setSignedinUserReducer(state={}, action) {
  switch (action.type) {
    case SET_SIGNEDIN_USER:
      return { ...state, username: action.payload.user, joinedAt: action.payload.joinedAt, favorites: action.payload.favorites };
  }
  return state;
}
