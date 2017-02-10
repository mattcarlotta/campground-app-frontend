import { FETCH_WEATHER } from '../actions/Types';

export function fetchWeatherReducer(state={}, action) {
  switch (action.type) {
    case FETCH_WEATHER:
      return { ...state, ...action.payload };
  }
  return state;
}
