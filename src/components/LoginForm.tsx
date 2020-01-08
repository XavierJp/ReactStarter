import React, { useRef, FormEvent, useContext } from "react";

import FormWrapper from "src/components/FormWrapper";
import Button from "src/components/Button";
import { UserContext } from "src/context";
import { actions } from "src/context/User";
import urls from "../const/urls";
import { apiUtils } from "../services";

const LoginForm: React.FC<{}> = () => {
  const userInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const [state, dispatch] = useContext(UserContext);
  const [loader, setLoader] = useContext(true);

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
    apiUtils.post(urls.login, data, (json: any) => {
      dispatch(actions.login(json.token, json.user.username));
      setLoader(false);
    });
    //need error management
  };

  return (
    <FormWrapper onSubmit={submit}>
      <h4>Connexion</h4>
      <label htmlFor="username">Nom d'utilisateur</label>
      <input required type="text" ref={userInput} name="username" />
      <label htmlFor="password">Mot de passe</label>
      <input required type="password" name="password" ref={passwordInput} />
      <Button type="submit" isLoading={loader}>
        Go !
      </Button>
    </FormWrapper>
  );
};

export default LoginForm;
