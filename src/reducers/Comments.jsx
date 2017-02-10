import { SET_COMMENT_TEXT } from '../actions/Types';

export function commentTextReducer(state='', action) {
  switch (action.type) {
    case SET_COMMENT_TEXT:
      return { ...state, ...action.payload };;
  }
  return state;
}
