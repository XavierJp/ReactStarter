import React, { useRef, FormEvent, useContext, useState } from "react";
import { useHistory } from "react-router";

import FormWrapper from "src/components/FormWrapper";
import Button from "src/uiComponents/Button";
import TextInput from "src/uiComponents/TextInput";
import { UserContext, AlertContext } from "src/context";
import { actions as userActions } from "src/context/User";
import { actions as alertsActions, Level } from "src/context/Alerts";

import urls from "../const/urls";
import { apiUtils } from "../services";

const LoginForm: React.FC<{}> = () => {
  const userInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  //@ts-ignore
  const [{ user }, dispatchUserAction] = useContext(UserContext);
  //@ts-ignore
  const [{ alerts }, dispatchAlertsAction] = useContext(AlertContext);
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

    setLoader(true);
    window.setTimeout(() => {
      apiUtils.post(
        urls.login,
        data,
        (json: any) => {
          setLoader(false);
          dispatchUserAction(userActions.login(json.token, json.user.username));
          history.push("/");
        },
        (errorMsg: Error) => {
          setLoader(false);
          dispatchAlertsAction(
            alertsActions.new(Level.ERROR, errorMsg.message)
          );
        }
      );
    }, 300);
    //need error management
  };

  return (
    <FormWrapper onSubmit={submit}>
      <h4>Connexion</h4>
      <TextInput
        name="username"
        placeholder="John Doe"
        label="Nom d'utilisateur"
        type="text"
        //@ts-ignore
        ref={userInput}
      />
      <TextInput
        name="password"
        placeholder="mot de passe"
        label="Mot de passe"
        type="password"
        //@ts-ignore
        ref={passwordInput}
      />
      <Button type="submit" isLoading={loader} value="Ok" />
    </FormWrapper>
  );
};

export default LoginForm;
