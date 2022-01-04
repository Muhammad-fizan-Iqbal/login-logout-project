import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Menu, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/auth";

// underlying logic of the component is:
// - if pathname !=== "/login" then do not show TopNavigation bar
// - if user is-not-authenticated then disable "Dashboard" and do not show user menu
// - if isFetching then do not allow clicking on logout button
const TopNavigation = ({
  isAuthenticated,
  isFetching,
  pathname,
  login,
  logout
}) => (
  <div>
    {pathname !== "/login" ? (
      <Menu
        inverted
        style={{
          marginBottom: "1em"
        }}
      >
        <Menu.Item as={Link} to="/">
          Home
        </Menu.Item>
        <Menu.Item disabled={!isAuthenticated} as={Link} to="/dashboard">
          Dashboard
        </Menu.Item>

        {isAuthenticated ? (
          <Menu.Menu position="right">
            <Dropdown item text="Dropdown">
              <Dropdown.Menu>
                <Dropdown.Item
                  disabled={isFetching}
                  onClick={() =>
                    logout({
                      email: localStorage.testEmail,
                      token: localStorage.testToken
                    })
                  }
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        ) : null}
      </Menu>
    ) : null}
  </div>
);

TopNavigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

// ownProps is for the props of the component
// this had to be used because this is a stateless component
const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: !!state.userReducer.token,
  isFetching: state.userReducer.isFetching,
  pathname: ownProps.location.pathname
});

// withRouter() wraps the component so that in ownProps is accessible 'location'
export default withRouter(
  connect(mapStateToProps, { login: actions.login, logout: actions.logout })(
    TopNavigation
  )
);
