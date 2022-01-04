import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import StatePanel from "./components/panels/StatePanel";
import TopNavigation from "./components/navigation/TopNavigation";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";

// { location } must be passed to cope with the update-blocking problem.
// See https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
// at "Recommended Solution"
//
// GuestRoute and UserRoute are Higher Order Components. They are used to handle routing logic according to access level.
// See their respective components.
const App = ({ location }) => (
  <div className="ui container">
    <StatePanel />
    <TopNavigation />
    <Route location={location} exact path="/" component={HomePage} />
    <GuestRoute location={location} exact path="/login" component={LoginPage} />
    <UserRoute
      location={location}
      exact
      path="/dashboard"
      component={DashboardPage}
    />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
