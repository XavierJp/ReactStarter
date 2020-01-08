import React from "react";

import LoginForm from "../components/LoginForm";
import { UserContext } from "src/context";

const LoginPage: React.FC<{}> = () => (
  <UserContext.Consumer>
    {({ login }) => {
      return <LoginForm login={login}></LoginForm>;
    }}
  </UserContext.Consumer>
);

export default LoginPage;
