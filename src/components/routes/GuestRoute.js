import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

// this is an Higher Order Component.
// The essence of this pattern is
// if user is-not-Authenticated then render default component (as in App.js)
// else Redirect to "/dashboard".
// In practice, this means that if user authenticated goes to "/login"
// then he's redirected to "/dashboard", hence logged user cant' access "/login" anymore.
const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? <Component {...props} /> : <Redirect to="/dashboard" />
    }
  />
);

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.userReducer.token
});

export default connect(mapStateToProps)(GuestRoute);
