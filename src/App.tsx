import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { apiUtils } from "./services";
import urls from "./const/urls";
import NavBar from "./components/NavBar";
import "./App.css";

import { Login, Home } from "./routes";

const App: React.FC<{}> = () => {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (username: string, password: string) => {
    const data = { username, password };

    apiUtils.post(urls.login, data, (json: any) => {
      saveAuthentication(json.token, json.user.username);
    });
  };

  const handleSignup = (username: string, password: string) => {
    const data = { username, password };

    apiUtils.post(urls.signup, data, (json: any) =>
      saveAuthentication(json.token, json.username)
    );
  };

  /**
   * save authentication token to local storage
   * @param token
   * @param username
   */
  const saveAuthentication = (token: string, username: string) => {
    localStorage.setItem("token", token);
    setUsername(username);
    setLoggedIn(true);
  };

  /**
   * Clear authentication token from local storage
   */
  const clearAuthication = () => {
    localStorage.removeItem("token");
    setUsername("");
    setLoggedIn(false);
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  useEffect(() => {
    console.log(isLoggedIn());
    if (isLoggedIn()) {
      fetch(urls.currentUser, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`
        }
      })
        .then(res => res.json())
        .then(json => {
          setUsername(json.username);
        });
    }
    return () => {};
  });

  return (
    <Router>
      <NavBar loggedIn={loggedIn} logout={clearAuthication} />
      {username ? `Welcome ${username} ;)` : "Hello there, please login !"}
      <Switch>
        <Route path="/login">
          <Login onSubmit={handleLogin} />
        </Route>
        <Route path="/signup">
          <Login isSignup={true} onSubmit={handleSignup} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
