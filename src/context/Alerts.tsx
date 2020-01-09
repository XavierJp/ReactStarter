import React, { useReducer } from "react";

export enum Level {
  ERROR,
  WARNING,
  INFO
}

export interface Alert {
  level: Level;
  description: string;
  timestamp?: number;
}

interface IState {
  alerts: Map<string, Alert>;
}

const simpleHash = (str: string) => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

const alertKey = (alert: Alert) => {
  return simpleHash(encodeURI(alert.description + alert.timestamp)).toString();
};

const initialValue: IState = {
  alerts: new Map()
};

export const alertReducer = (state: IState, action: any) => {
  const newAlerts = new Map(state.alerts);
  switch (action.type) {
    case "NEW_ALERT":
      const newAlert: Alert = {
        description: action.payload.description,
        level: action.payload.level,
        timestamp: Date.now()
      };
      const newKey = alertKey(newAlert);

      newAlerts.set(newKey, newAlert);
      return {
        alerts: newAlerts
      };
    case "DISMISS_ALERT":
      const keyToRemove = alertKey(action.payload);
      newAlerts.delete(keyToRemove);

      return {
        alerts: newAlerts
      };
    default:
      return state;
  }
};

export const actions = {
  dismiss: (alert: Alert) => {
    return {
      type: "DISMISS_ALERT",
      payload: {
        ...alert
      }
    };
  },
  new: (level: Level, description: string) => {
    return {
      type: "NEW_ALERT",
      payload: {
        level: level,
        description: description
      }
    };
  }
};

export const AlertContext = React.createContext(initialValue);

const AlertProvider: React.FC<{}> = props => {
  // Careful ! smthg might be generating new obj ref and thus triggering an unwanted re-render
  const value = useReducer(alertReducer, initialValue);
  return (
    //@ts-ignore
    <AlertContext.Provider value={value}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
