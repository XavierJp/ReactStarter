import React, { useContext, useEffect, useReducer } from "react";

import { AlertContext, actions as alertsActions, Level } from "./Alerts";
import urls from "src/const/urls";

interface User {
  name: string;
}

interface IState {
  user: User | null;
}

const initialValue: IState = {
  user: null
};

export const UserContext = React.createContext(initialValue);

export const actions = {
  login: (token: string, username: string) => {
    return {
      type: "LOG_IN",
      payload: {
        token,
        username
      }
    };
  },
  logout: () => {
    return {
      type: "LOG_OUT"
    };
  }
};

export const userReducer = (state: IState, action: any) => {
  console.log(action);

  switch (action.type) {
    case "LOG_IN":
      saveAuthentication(action.payload.token, action.payload.password);
      return {
        user: { name: action.payload.username }
      };
    case "LOG_OUT":
      clearAuthentication();
      return {
        user: null
      };
    default:
      return state;
  }
};

const clearAuthentication = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const saveAuthentication = (token: string, username: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", username);
};

const UserProvider: React.FC<{}> = props => {
  //@ts-ignore
  const [state, dispatch] = useContext(AlertContext);
  const value = useReducer(userReducer, initialValue);

  // all this belong to App and not to UserProvider
  useEffect(() => {
    const token = localStorage.getItem("token");

    const [{ user }, dispatchUser] = value;

    console.log(user, dispatchUser, token);

    if (!!token && !user) {
      fetch(urls.currentUser, {
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(res => {
          if (!res.ok) {
            console.log(res);
            dispatch(
              alertsActions.new(
                Level.ERROR,
                "Token must be outdated. You have been logout"
              )
            );
            // token has expired
            // need error management here
            dispatchUser(actions.logout());
          }
          return res.json();
        })
        .then(json => {
          dispatchUser(actions.login(token, json.username));
        });
    }
    return () => {};
  });

  return (
    //@ts-ignore
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

//@ts-ignore
export default UserProvider;
