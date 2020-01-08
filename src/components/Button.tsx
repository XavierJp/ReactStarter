import React from "react";
import styled from "styled-components";

import style from "src/const/style";
import Spinner from "src/uiComponents/Spinner";

const ButtonWrapper = styled.button`
  display: inline-block;
  border-radius: 4px;
  padding: 12px 20px;
  vertical-align: middle;
  color: ${style.colors.white};
  border: none;
  outline: none;
  text-decoration: none;
  background: ${style.colors.lightBlue};
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  transform: translate3d(0, 0, 0);
  box-shadow: 0 0 0 transparent;
  -webkit-appearance: none;
  user-select: none;
  transition: 0.2s;
  will-change: transform, box-shadow;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1), 0 -100px 0 transparent inset;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #fff 0%, #000 100%);
    z-index: -1;
    opacity: 0.05;
  }
  &:hover,
  &:focus {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1),
      0 -100px 0 rgba(0, 0, 0, 0.15) inset;
  }
`;

interface IProps {
  isLoading: boolean;
}

const Button: React.FC<IProps> = props => {
  return (
    <ButtonWrapper>
      {props.isLoading ? props.children : <Spinner />}
    </ButtonWrapper>
  );
};

export default Button;
