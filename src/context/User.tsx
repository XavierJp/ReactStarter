import React, { useContext, useEffect, useReducer } from "react";

import { AlertContext } from "./Alerts";
// , actions as alertActions, Level

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

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   fetch(urls.currentUser, {
    //     headers: {
    //       Authorization: `JWT ${token}`
    //     }
    //   })
    //     .then(res => {
    //       if (!res.ok) {
    //         console.log(res);
    //         dispatch(alertActions.new(Level.ERROR, JSON.stringify(res)));
    //         // token has expired
    //         // need error management here
    //         // logout();
    //       }
    //       return res.json();
    //     })
    //     .then(json => {
    //       saveAuthentication(token, json.username);
    //     });
    // }
    // return () => {};
  });

  const value = useReducer(userReducer, initialValue);
  return (
    //@ts-ignore
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

//@ts-ignore
export default UserProvider;
