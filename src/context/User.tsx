import React, {useContext, useEffect} from "react";

import urls from "../const/urls";
import { apiUtils } from "../services";
import { AlertContext } from "./Alerts";

interface User {
  name: string;
}

interface IState {
  user: User | null;
}

/**
 * I don't feel the need for a reducer. User management only happens from two pages (login & signup)
 * Every other time it is only read access to user info that is needed
 */
const initialState: IState = {
  user: null,
};

export const UserContext = React.createContext(initialState);

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
      type: "LOG_OUT",
    };
  }
};

export const userReducer = (state: IState, action: any) => {
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
}

const saveAuthentication = (token: string, username: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", username);
};


const UserProvider: React.FC<{}> = () => {
  //@ts-ignore
  const [state, dispatch] = useContext(AlertContext);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    fetch(urls.currentUser, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          console.log(res);


          // token has expired
          // need error management here
          this.logout();
        }
        return res.json();
      })
      .then(json => {
        this.saveAuthentication(token, json.username);
      });
  }
  return () => {};
});


  const value = useReducer(userReducer, initialValue)

  return (
    <AlertContext
    <UserContext.Provider value={value}>
      {this.props.children}
    </UserContext.Provider>
  );
}



//@ts-ignore
export default UserProvider;
