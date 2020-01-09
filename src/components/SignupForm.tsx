import React, { useRef, FormEvent, useContext, useState } from "react";

import FormWrapper from "src/components/FormWrapper";
import Button from "src/components/Button";
import { UserContext } from "src/context";
import { actions } from "src/context/User";
import urls from "../const/urls";
import { apiUtils } from "../services";

const SignupForm: React.FC<{}> = () => {
  const userInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  //@ts-ignore
  const [state, dispatch] = useContext(UserContext);
  const [loader, setLoader] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();

    if (!userInput.current || !passwordInput.current) {
      return;
    }

    const data = {
      username: userInput.current.value,
      password: passwordInput.current.value
    };

    setLoader(true);
    window.setTimeout(() => {
      apiUtils.post(urls.signup, data, (json: any) => {
        setLoader(false);
        dispatch(actions.login(json.token, json.user.username));
      });
    }, 300);
    //need error management
  };

  return (
    <FormWrapper onSubmit={submit}>
      <h4>Sign Up</h4>
      <label htmlFor="username">Username</label>
      <input type="text" ref={userInput} name="username" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" ref={passwordInput} />
      <Button type="submit" isLoading={loader}>
        Go !
      </Button>
    </FormWrapper>
  );
};

export default SignupForm;
