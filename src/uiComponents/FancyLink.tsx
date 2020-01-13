import React from "react";
import styled from "styled-components";

import style from "src/const/style";

const LinkWrapper = styled.span`
  a {
    text-decoration: none;
    color: ${style.colors.lightBlue};
    font-weight: 600;
    font-size: 0.9rem;
    padding: 3px 0px;
    margin: 3px 5px;
  }

  &.button > a {
    border: 1px solid ${style.colors.lightBlue};
    border-radius: 4px;
    padding: 3px 7px;
    transition: background 150ms ease-in-out, color 150ms ease-in-out;

    &:hover {
      background-color: ${style.colors.lightBlue};
      color: #fff;
    }
  }

  &.underlined:hover > a {
    text-decoration: underline;
  }
`;

interface IProps {
  value?: string;
  isButton?: boolean;
  isUnderlined?: boolean;
}

const FancyLink: React.FC<IProps> = props => {
  const { value, isUnderlined, isButton } = props;
  return (
    <LinkWrapper
      className={`${isButton && "button"} ${isUnderlined && "underlined"}`}
    >
      {value ? value : props.children}
    </LinkWrapper>
  );
};

export default FancyLink;
