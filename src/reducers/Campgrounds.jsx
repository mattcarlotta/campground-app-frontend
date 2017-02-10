import {
  FETCH_CAMPGROUND,
  FETCH_CAMPGROUND_COMMENTS,
  FETCH_CAMPGROUNDS
} from '../actions/Types';

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
