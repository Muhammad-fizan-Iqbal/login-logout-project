import React from "react";
import PropTypes from "prop-types";
import { Button, Grid, Header, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";

// Button logout does not neead a spinner because when clicked
// isAuthenticated goes to false and user is redirected to "/".
// See logic in routes components.
const DashboardPage = ({ isAuthenticated, userEmail, logout }) => (
  <div>
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Dashboard
        </Header>

        <Message
          header="This is the app for beloved user"
          content={userEmail}
          style={{
            marginBottom: "1em",
            marginTop: "1em"
          }}
        />

        {isAuthenticated ? (
          <Button
            primary
            onClick={() =>
              logout({
                email: localStorage.testEmail,
                token: localStorage.testToken
              })
            }
          >
            Logout
          </Button>
        ) : (
          <span />
        )}
      </Grid.Column>
    </Grid>
  </div>
);

DashboardPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

// the case where isAuthenticated=false and userEmail=""
// is actually never used but it's there for generality sake.
const mapStateToProps = state =>
  !!state.userReducer.token
    ? {
        isAuthenticated: !!state.userReducer.token,
        userEmail: state.userReducer.email
      }
    : { isAuthenticated: false, userEmail: "" };

export default connect(mapStateToProps, { logout: actions.logout })(
  DashboardPage
);
