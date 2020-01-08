import React, { useContext } from "react";
import { AlertContext } from "../context";
import { Level, actions } from "src/context/Alerts";
import AlertItem from "./AlertItem";

const AlertBanner: React.FC<{}> = () => {
  //@ts-ignore
  const [{ alerts }, dispatch] = useContext(AlertContext);

  return (
    <>
      <div>
        {[...alerts.keys()]
          .reverse()
          .slice(0, 3)
          .map(key => {
            const alert = alerts.get(key);
            return (
              alert && (
                <AlertItem
                  key={key}
                  description={alert.description}
                  level={alert.level}
                  dismiss={() => dispatch(actions.dismiss(alert))}
                />
              )
            );
          })}
      </div>
      <button
        onClick={() => {
          dispatch({
            type: "NEW_ALERT",
            payload: {
              level: Level.INFO,
              description: "groos prout"
            }
          });
        }}
      >
        INFO
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "NEW_ALERT",
            payload: {
              level: Level.WARNING,
              description: "groos prout"
            }
          });
        }}
      >
        ERROR
      </button>
    </>
  );
};

export default AlertBanner;
