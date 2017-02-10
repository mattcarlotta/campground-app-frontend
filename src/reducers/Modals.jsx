import {
  SIGNIN_MODAL,
  SIGNUP_MODAL,
} from '../actions/Types';

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
