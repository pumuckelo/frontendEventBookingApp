import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import EventPage from "./pages/Events";
import BookingPage from "./pages/Bookings";
import MainNavigation from "./components/Navigation/MainNavigation";
import MyBookings from "./pages/MyBookings";
import AuthContext from "./context/auth-context";
import MyEvents from "./pages/MyEvents";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "./App.css";

class App extends Component {
  // state will be used in authcontext provider
  state = {
    token: null,
    userId: null
  };

  //SET UP APOLLO GRAPHQL CLIENT
  httpLink = new HttpLink({ uri: "http://localhost:8000/graphql" });
  authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${this.state.token}`
      }
    });
    return forward(operation);
  });
  apolloclient = new ApolloClient({
    link: this.authLink.concat(this.httpLink),
    cache: new InMemoryCache()
  });

  //setup login functions for authcontext provider
  login = (token, userId, tokenExpiration) => {
    this.setState({
      token: token,
      userId: userId
    });
  };
  // setup logout function for authcontext provider
  logout = () => {
    this.setState({
      token: null,
      userId: null
    });
  };

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}
        >
          <ApolloProvider client={this.apolloclient}>
            <MainNavigation />
            <main className="body">
              <Switch>
                {!this.state.token && (
                  <Route path="/login" component={LoginPage} />
                )}

                {!this.state.token && (
                  <Route path="/signup" component={SignupPage} />
                )}
                <Route path="/events" component={EventPage} />
                {this.state.token && (
                  <Redirect from="/login" to="/events" exact />
                )}
                {this.state.token && (
                  <Redirect from="/signup" to="/events" exact />
                )}
                {this.state.token && <Redirect from="/" to="/events" exact />}
                {this.state.token && (
                  <Route path="/bookings" component={BookingPage} />
                )}
                {this.state.token && (
                  <Route path="/mybookings" component={MyBookings} />
                )}
                {this.state.token && (
                  <Route path="/myevents" component={MyEvents} />
                )}
                {!this.state.token && <Redirect to="/events" exact />}
              </Switch>
            </main>
          </ApolloProvider>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
