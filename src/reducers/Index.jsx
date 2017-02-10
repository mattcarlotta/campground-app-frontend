import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { authReducer, setSignedinUserReducer } from './Auth';
import { fetchCampgroundReducer, fetchCampgroundsReducer } from './Campgrounds';
import { commentTextReducer } from './Comments';
import { signinModalStateReducer, signupModalStateReducer } from './Modals';
import { searchTextReducer } from './Search';
import { fetchWeatherReducer } from './Weather';

export default combineReducers({
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
