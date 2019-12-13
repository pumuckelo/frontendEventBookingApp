import React, { Component } from "react";
import "./Auth.css";

import AuthContext from "../context/auth-context";

class AuthPage extends Component {
  state = {
    isLogin: true,
    hasError: false,
    errorMessage: ""
  };

  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.usernameElement = React.createRef();
    this.emailElement = React.createRef();
    this.passwordElement = React.createRef();
  }

  switchToSignup = () => {
    this.setState({
      isLogin: false,
      hasError: false
    });
  };
  switchToLogin = () => {
    this.setState({
      isLogin: true,
      hasError: false
    });
  };

  submitHandler = event => {
    event.preventDefault();
    let body = {};
    let email = this.emailElement.current.value;
    let password = this.passwordElement.current.value;
    if (this.state.isLogin) {
      //build login query
      body = {
        query: `query {
            login(email:"${email}", password:"${password}"){
                token 
                userId
                tokenExpiration
            }
        }`
      };
    } else {
      let username = this.usernameElement.current.value;
      //send register mutation / build register mutation
      body = {
        query: `mutation {
            createUser(userInput:{email:"${email}", password:"${password}", username:"${username}"}){
                username
            }
        }`
      };
    }
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
        } else if (this.state.isLogin) {
          this.context.login(
            data.data.login.token,
            data.data.login.userId,
            data.data.login.tokenExpiration
          );
          console.log(data.data.login);
        } else {
          console.log(data.data.createUser.username);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    if (this.state.isLogin) {
      return (
        <div className="auth-all">
          <form onSubmit={this.submitHandler} className="auth-form" action="">
            {this.state.hasError ? (
              <div className="errormessage">{this.state.errorMessage}</div>
            ) : (
              <div></div>
            )}
            <h1>Login</h1>
            <div className="form-control">
              <input
                type="email"
                placeholder="E-Mail"
                ref={this.emailElement}
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                placeholder="Password"
                ref={this.passwordElement}
              />
            </div>
            <div className="form-actions">
              <button type="Submit">Login</button>
              <button onClick={this.switchToSignup} type="button">
                Switch to Signup
              </button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="auth-all">
          <form onSubmit={this.submitHandler} className="auth-form" action="">
            {this.state.hasError ? (
              <div className="errormessage">{this.state.errorMessage}</div>
            ) : (
              <div></div>
            )}
            <h1>Signup</h1>
            <div className="form-control">
              <input
                type="text"
                placeholder="Username"
                ref={this.usernameElement}
              />
            </div>
            <div className="form-control">
              <input
                type="email"
                placeholder="E-Mail"
                ref={this.emailElement}
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                placeholder="Password"
                ref={this.passwordElement}
              />
            </div>
            <div className="form-actions">
              <button type="Submit">Signup</button>
              <button onClick={this.switchToLogin} type="button">
                Switch to Login
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}
export default AuthPage;
