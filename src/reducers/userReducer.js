import {
  USER_LOGGING_IN,
  USER_LOGGING_OUT,
  USER_LOGGED_IN,
  USER_NOT_LOGGED_IN
} from "../types";

// the property 'stateName' is used only because according to specifics
// the name of the states must shown in the app. Otherwise is not needed.
export default function userReducer(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGING_IN:
      return Object.assign(
        {},
        { stateName: USER_LOGGING_IN },
        { isFetching: true }
      );
    case USER_LOGGING_OUT:
      return Object.assign(
        {},
        { stateName: USER_LOGGING_OUT },
        { isFetching: true }
      );
    case USER_LOGGED_IN:
      return Object.assign(
        {},
        { stateName: USER_LOGGED_IN },
        { isFetching: false },
        action.payload
      );
    case USER_NOT_LOGGED_IN:
      return Object.assign(
        {},
        { stateName: USER_NOT_LOGGED_IN },
        { isFetching: false }
      );

    default:
      return state;
  }
}
