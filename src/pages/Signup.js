import React, { Component } from "react";
import AuthContext from "../context/auth-context";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import "./Signup.css";

class Signup extends Component {
  state = {
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

  submitHandler = event => {
    event.preventDefault();
    let body = {};
    let email = this.emailElement.current.value;
    let password = this.passwordElement.current.value;
    let username = this.usernameElement.current.value;
    //send register mutation / build register mutation
    body = {
      query: `mutation {
            createUser(userInput:{email:"${email}", password:"${password}", username:"${username}"}){
                username
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
        } else {
          console.log(data.data.createUser.username);
          let loginquery = {
            query: `
              query {
                login(email:"${email}", password:"${password}"){
                    token
                    userId
                    tokenExpiration
                }
              }
              `
          };
          fetch("http://localhost:8000/graphql", {
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(loginquery)
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
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="auth-all">
        <form onSubmit={this.submitHandler} className="auth-form" action="">
          {this.state.hasError && (
            <ErrorMessage message={this.state.errorMessage} />
          )}
          <h1>Signup</h1>
          <div className="form-control">
            <input
              required
              type="text"
              placeholder="Username"
              ref={this.usernameElement}
            />
          </div>
          <div className="form-control">
            <input
              required
              type="email"
              placeholder="E-Mail"
              ref={this.emailElement}
            />
          </div>
          <div className="form-control">
            <input
              required
              type="password"
              placeholder="Password"
              ref={this.passwordElement}
            />
          </div>
          <div className="form-actions">
            <button className="btn" type="Submit">
              Signup
            </button>
            <button
              className="btn btn-light"
              onClick={this.switchToLogin}
              type="button"
            >
              <Link to="/login">Switch to Login</Link>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
