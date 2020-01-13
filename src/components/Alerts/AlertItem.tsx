import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { lighten, darken } from "polished";

import { Alert, Level } from "../../context/Alerts";
import icons from "../../static/icons";
import style from "../../const/style";

interface IProps extends Alert {
  dismiss: () => void;
}

interface ColorProps {
  color: string;
}

const AlertWrapper = styled.div<ColorProps>`
  background-color: ${props => lighten(0.25)(props.color)};
  margin: 5px 20px;
  padding: 0 20px;
  border: 1px solid ${props => lighten(0.15)(props.color)};
  border-radius: 4px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  opacity: 0;
  max-height: 0;

  > div:first-of-type,
  > div:last-of-type {
    > svg {
      stroke: ${props => props.color};
      width: 20px;
    }
  }
  > div:last-of-type {
    cursor: pointer;
  }

  > div:nth-of-type(2) {
    color: ${props => darken(0.17)(props.color)};
    font-size: 0.9rem;
    margin-left: 20px;
    flex-grow: 1;
  }
`;

const levelIcon = (level: Level) => {
  switch (level) {
    case Level.INFO:
      return icons.info;
    case Level.WARNING:
      return icons.warning;
    case Level.ERROR:
    default:
      return icons.error;
  }
};

const levelColor = (level: Level) => {
  switch (level) {
    case Level.INFO:
      return style.colors.infoBlue;
    case Level.WARNING:
      return style.colors.warningOrange;
    case Level.ERROR:
    default:
      return style.colors.errorRed;
  }
};

const AlertItem: React.FC<IProps> = props => {
  const { level, description, dismiss } = props;
  const color = levelColor(level);

  const wrapper = useRef<HTMLDivElement>(null);

  const animationDuration = 250;

  const alertDuration = 5000;

  const animateAndDismiss = () => {
    const elem = wrapper && wrapper.current;

    if (elem) {
      //@ts-ignore
      elem.animate(
        [
          { opacity: 1, maxHeight: "200px" },
          { opacity: 0, maxHeight: "0" }
        ],
        {
          duration: animationDuration,
          easing: "ease-in-out",
          fill: "both"
        }
      );
    }
    window.setTimeout(dismiss, animationDuration);
  };

  useEffect(() => {
    const elem = wrapper && wrapper.current;

    if (!elem) {
      return;
    }
    //@ts-ignore
    elem.animate(
      [
        { opacity: 0, maxHeight: "0" },
        { opacity: 1, maxHeight: "200px" }
      ],
      {
        duration: animationDuration,
        easing: "ease-in-out",
        fill: "both"
      }
    );

    // after X seconds afer ** being displayed **, every error gets removed
    window.setTimeout(() => {
      if (wrapper) {
        animateAndDismiss();
      }
    }, alertDuration);
  }, []);

  return (
    <AlertWrapper color={color} ref={wrapper}>
      <div>{levelIcon(level)}</div>
      <div>{description || "An error has occured."}</div>
      <div onClick={animateAndDismiss}>{icons.cross}</div>
    </AlertWrapper>
  );
};

export default AlertItem;
