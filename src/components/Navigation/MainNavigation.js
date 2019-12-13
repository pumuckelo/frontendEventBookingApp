import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import "./MainNavigation.css";
import AuthContext from "../../context/auth-context";

const MainNavigation = props => {
  return (
    <AuthContext.Consumer>
      {context => {
        return (
          <header className="main-nav">
            <div className="main-nav_logo">
              <h1>eventify</h1>
            </div>
            <ul className="main-nav_items">
              <li>
                <NavLink to="/events">Events</NavLink>
              </li>
              {!context.token && (
                <Fragment>
                  <li className="login">
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li className="signup">
                    <NavLink to="/signup">Signup</NavLink>
                  </li>
                </Fragment>
              )}

              {context.token && (
                <Fragment>
                  <li>
                    <NavLink to="/bookings">Bookings</NavLink>
                  </li>
                  <li>
                    <NavLink to="/mybookings">My Bookings</NavLink>
                  </li>
                  <li>
                    <NavLink to="/myevents">My Events</NavLink>
                  </li>
                  <li>
                    <button onClick={context.logout}>Logout</button>
                  </li>
                </Fragment>
              )}
            </ul>
          </header>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default MainNavigation;
