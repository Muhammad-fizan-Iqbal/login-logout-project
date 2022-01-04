import React from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Message,
  Segment,
  Header,
  Grid
} from "semantic-ui-react";
import Validator from "validator";

class LoginForm extends React.Component {
  // this component handles states internally.
  // 'loading' is used during fetching in order to show spinner.
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  // this is in abstract form in order to avoid using two functions: onChangeEmail, onChangePassword
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    // if property 'error' has no internal objects inside
    if (Object.keys(errors).length === 0) {
      // disable form
      this.setState({ loading: true });
      // after fetching
      // - if user is logged in then credentials are written into localStorage and user is redirected away (see routes components)
      // - if user is not logged in because credentials were wrong then an error is shown and spinner is stopped
      this.props.submit(this.state.data).then(() => {
        if (!localStorage.testEmail || !localStorage.testToken) {
          this.setState({
            errors: { loginDenied: true },
            loading: false
          });
        }
      });
    }
  };

  validate = data => {
    const errors = {};
    // specifics did not required email as username but I realized this in a following time.
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";

    // password must not contain some characters, according to specifics
    // and must not be void
    if (data.password) {
      // regexp meaning = "at least one instance of at least one of the following single characters"
      // note than <blank space> has been added to specifics
      const format = /[ ^\\,./]/;
      if (format.test(data.password)) {
        errors.password =
          "Password cannot contain special characters: \\ / , . ^ <blank space>";
      }
    } else {
      errors.password = "Password cannot be void";
    }

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <div height="100%">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center">
              Login to your account
            </Header>
            <Form onSubmit={this.onSubmit} loading={loading}>
              {errors.loginDenied && (
                <Message negative>
                  <p>Error in login: wrong password or username not found.</p>
                </Message>
              )}
              <Segment stacked>
                <Form.Field error={!!errors.email}>
                  <label htmlFor="email" align="left">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="youremail@here.com"
                    value={data.email}
                    onChange={this.onChange}
                  />
                  <span style={{ color: "#ae5856" }}>{errors.email}</span>
                </Form.Field>
                <Form.Field error={!!errors.password}>
                  <label htmlFor="password" align="left">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="your password here"
                    value={data.password}
                    onChange={this.onChange}
                  />
                  <span style={{ color: "#ae5856" }}>{errors.password}</span>
                </Form.Field>
                <Button primary>Login</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
