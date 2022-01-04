import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

// this is an Higher Order Component.
// The essence of this pattern is
// if user isAuthenticated then render default component (as in App.js)
// else Redirect to "/".
// In practice, this means that if user not authenticated goes to "/dashboard"
// then he's redirected to "/".
const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.userReducer.token
});

export default connect(mapStateToProps)(UserRoute);
