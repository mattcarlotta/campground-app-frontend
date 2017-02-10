import { SET_SEARCH_TEXT } from '../actions/Types';

export function searchTextReducer(state = '', action) {
  switch (action.type) {
    case SET_SEARCH_TEXT:
      return action.payload;
  };
  return state;
};
