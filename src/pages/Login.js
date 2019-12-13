import React, { Component } from "react";
import "./Login.css";
import AuthContext from "../context/auth-context";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    hasError: false,
    errorMessage: ""
  };
  constructor(props) {
    super(props);
    this.emailElement = React.createRef();
    this.passwordElement = React.createRef();
  }

  static contextType = AuthContext;

  submitHandler = event => {
    event.preventDefault();
    let email = this.emailElement.current.value;
    let password = this.passwordElement.current.value;

    //build login query
    let body = {
      query: `query {
                login(email:"${email}", password:"${password}"){
                    token 
                    userId
                    tokenExpiration
                }
            }`
    };

    fetch("http://localhost:8000/graphql", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.errors) {
          this.setState({
            hasError: true,
            errorMessage: data.errors[0].message
          });
        }
        this.context.login(
          data.data.login.token,
          data.data.login.userId,
          data.data.login.tokenExpiration
        );
        console.log(data.data.login);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="login-all">
        <form onSubmit={this.submitHandler} className="auth-form" action="">
          {this.state.hasError && (
            <ErrorMessage message={this.state.errorMessage}></ErrorMessage>
          )}
          <h1>Login</h1>
          <div className="form-control">
            <input
              type="email"
              autoComplete="email"
              placeholder="E-Mail"
              ref={this.emailElement}
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              ref={this.passwordElement}
            />
          </div>
          <div className="form-actions">
            <button className="btn" type="Submit">
              Login
            </button>
            <button
              className="btn btn-light"
              onClick={this.switchToSignup}
              type="button"
            >
              <Link to="/signup">Switch to Signup</Link>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
