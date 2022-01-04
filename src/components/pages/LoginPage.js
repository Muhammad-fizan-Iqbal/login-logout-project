import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/auth";

class LoginPage extends React.Component {
  //this function returns a promise
  submit = data => this.props.login(data);

  render() {
    return (
      <div>
        <LoginForm submit={this.submit} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);
