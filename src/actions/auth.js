import {
  USER_LOGGING_IN,
  USER_LOGGING_OUT,
  USER_LOGGED_IN,
  USER_NOT_LOGGED_IN
} from "../types";
import api from "../api";

export const userLoggingIn = () => ({ type: USER_LOGGING_IN });
export const userLoggingOut = () => ({ type: USER_LOGGING_OUT });
export const userLoginSuccess = payload => ({ type: USER_LOGGED_IN, payload });
export const userLoginFail = () => ({ type: USER_NOT_LOGGED_IN });
export const userLogoutSuccess = () => ({ type: USER_NOT_LOGGED_IN });
// userLogoutFail is not present because we are assuming that logout is always executed
// even if backend disagrees.

export const login = credentials => dispatch => {
  dispatch(userLoggingIn());

  //in this way the action returns a promise than can be used elsewhere
  return api.user.login(credentials).then(data => {
    if (data.success) {
      localStorage.testEmail = data.email;
      localStorage.testToken = data.token;
      dispatch(
        userLoginSuccess({
          email: data.email,
          token: data.token
        })
      );
    } else {
      dispatch(userLoginFail());
    }
  });
};

export const logout = credentials => dispatch => {
  dispatch(userLoggingOut());

  //in this way the action returns a promise than can be used elsewhere
  return api.user.logout(credentials).then(data => {
    //logout is assumed to be always succesful, but that's not always true in real cases
    localStorage.removeItem("testEmail");
    localStorage.removeItem("testToken");
    dispatch(userLogoutSuccess());
  });
};
