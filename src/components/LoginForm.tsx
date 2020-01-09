import React, { useRef, FormEvent, useContext, useState } from "react";
import { useHistory } from "react-router";

import FormWrapper from "src/components/FormWrapper";
import Button from "src/components/Button";
import UserContext, { actions as userActions } from "src/context/User";
import AlertContext, {
  actions as alertActions,
  Level
} from "src/context/Alerts";

import urls from "../const/urls";
import { apiUtils } from "../services";

const LoginForm: React.FC<{}> = () => {
  const userInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  //@ts-ignore
  const [state, dispatch] = useContext(UserContext);
  //@ts-ignore
  const alertCtxt = useContext(AlertContext);
  const [loader, setLoader] = useState(false);
  const history = useHistory();

  const submit = (e: FormEvent) => {
    e.preventDefault();

    if (!userInput.current || !passwordInput.current) {
      return;
    }

    const data = {
      username: userInput.current.value,
      password: passwordInput.current.value
    };

    console.log(dispatch, state);
    setLoader(true);
    window.setTimeout(() => {
      apiUtils.post(
        urls.login,
        data,
        (json: any) => {
          setLoader(false);
          dispatch(userActions.login(json.token, json.user.username));
          history.push("/");
        },
        errorMsg => {
          setLoader(false);
          alertCtxt.dispatch(alertActions.new(Level.ERROR, errorMsg));
        }
      );
    }, 300);
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
