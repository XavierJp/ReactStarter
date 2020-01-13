import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AlertProvider } from "./context";
import UserProvider from "src/context/User";
import { AlertBanner } from "./components";
//import urls from "./const/urls";
import { NavBar } from "./components";
import "./App.css";

import { LoginPage, SignupPage, HomePage } from "./routes";

const App: React.FC<{}> = () => {
  return (
    <Router>
      <AlertProvider>
        <UserProvider>
          <NavBar />
          <AlertBanner />
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </UserProvider>
      </AlertProvider>
    </Router>
  );
};

export default App;
