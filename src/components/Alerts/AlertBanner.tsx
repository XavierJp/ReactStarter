import React, { useContext } from "react";
import { AlertContext } from "../../context";
import { actions } from "src/context/Alerts";
import AlertItem from "./AlertItem";

const AlertBanner: React.FC<{}> = () => {
  //@ts-ignore
  const [{ alerts }, dispatch] = useContext(AlertContext);

  return (
    <>
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
    </>
  );
};

export default AlertBanner;
