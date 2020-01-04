import React from "react";

import LoginForm from "../components/LoginForm";
import SignupForm from "src/components/SignupForm";

interface Props {
  onSubmit: (username: string, password: string) => void;
  isSignup?: true;
}

const Login: React.FC<Props> = props =>
  props.isSignup ? (
    <SignupForm signup={props.onSubmit}></SignupForm>
  ) : (
    <LoginForm login={props.onSubmit}></LoginForm>
  );

export default Login;
