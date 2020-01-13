import React, { Ref } from "react";
import styled from "styled-components";
import style from "../const/style";

interface IProps {
  type?: "text" | "password" | undefined;
  label?: string;
  placeholder?: string;
  name?: string;
}

const InputWrapper = styled.div`
  width: 100%;
  label {
    margin: 3px 5px 3px 0;
    font-size: 0.9rem;
    width: 100%;
  }

  input {
    -webkit-appearance: none;
    appearance: none;
  }

  input:focus {
    outline: none;
  }

  input[type="text"],
  input[type="password"] {
    width: calc(100% - 20px);
    border: 2px solid #ccc;
    border-radius: 3px;
    padding: 10px 10px;
    margin: 5px 0 15px;
    transition: border-color 150ms ease-in-out;

    &:focus {
      border-color: ${style.colors.lightBlue};
    }

    &::placeholder {
      font-style: italic;
      color: #ccc;
    }
  }
`;

const TextInput: React.FC<IProps> = React.forwardRef(
  (props, ref: Ref<HTMLInputElement>) => {
    const { type, label, name, placeholder } = props;

    return (
      <InputWrapper>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          required
          type={type || "text"}
          ref={ref}
          name={name}
          placeholder={placeholder || ""}
        />
      </InputWrapper>
    );
  }
);

export default TextInput;
