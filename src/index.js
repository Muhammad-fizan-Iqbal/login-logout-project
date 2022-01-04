import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./rootReducer";
import { userLoginSuccess, userLoginFail } from "./actions/auth";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// this snippet is needed  if user refresh page through browser.
// In that case credentials, if any, are recovered from localStorege
// and corresponding action is dispatched.
// Name of dispatched functions are not proper names, but this app has been
// made with economy of states and actions in mind.
if (localStorage.testToken && localStorage.testEmail) {
  store.dispatch(
    userLoginSuccess({
      email: localStorage.testEmail,
      token: localStorage.testToken
    })
  );
} else {
  localStorage.removeItem("testEmail");
  localStorage.removeItem("testToken");
  store.dispatch(userLoginFail());
}

// App must be wrapped with Route to cope with the update-blocking problem.
// See https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
// at "Recommended Solution"
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
