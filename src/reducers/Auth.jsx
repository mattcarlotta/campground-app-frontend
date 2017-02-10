import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_USER,
  SET_SIGNEDIN_USER,
  UPDATE_FAVORITES,
  UNAUTH_USER
} from '../actions/Types';

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
  }
  return state;
}

export function setSignedinUserReducer(state={}, action) {
  switch (action.type) {
    case SET_SIGNEDIN_USER:
      return { ...state, username: action.payload.user, joinedAt: action.payload.joinedAt, favorites: action.payload.favorites };
    case UPDATE_FAVORITES:
      return { ...state, favorites: action.payload }
  }
  return state;
}
