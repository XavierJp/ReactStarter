import React, { useRef, FormEvent } from "react";
import FormWrapper from "../components/FormWrapper";
import Button from "../components/Button";

interface Props {
  signup: (username: string, password: string) => void;
}

const SignupForm: React.SFC<Props> = props => {
  const userInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();

    if (!userInput.current || !passwordInput.current) {
      return;
    }
    props.signup(userInput.current.value, passwordInput.current.value);
  };

  return (
    <FormWrapper onSubmit={submit}>
      <h4>Sign Up</h4>
      <label htmlFor="username">Username</label>
      <input type="text" ref={userInput} name="username" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" ref={passwordInput} />
      <Button type="submit">Go !</Button>
    </FormWrapper>
  );
};

export default SignupForm;
