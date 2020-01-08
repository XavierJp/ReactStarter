import React from "react";

import SignupForm from "src/components/SignupForm";
import { UserContext } from "src/context";

const LoginPage: React.FC<{}> = () => (
  <UserContext.Consumer>
    {({ signup }) => {
      return <SignupForm signup={signup}></SignupForm>;
    }}
  </UserContext.Consumer>
);

export default LoginPage;
