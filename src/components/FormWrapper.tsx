import styled from "styled-components";
import style from "../const/style";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 35px;
  width: 300px;
  background: ${style.colors.white};
  border-radius: 5px;
  margin: auto;
  border: 1px solid #f6f6f6;
  box-shadow: 3px 5px 15px -5px rgba(0, 0, 0, 0.05);

  h4 {
    width: 100%;
  }

  label {
    margin: 3px 5px 3px 0;
    font-size: 0.9rem;
    width: 100%;
  }

  input {
    -webkit-appearance: none;
    appearance: none;
  }

  button,
  input,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
  }

  input:focus {
    outline: none;
  }

  input[type="text"],
  input[type="password"] {
    width: calc(100% - 10px);
    border: 2px solid #ccc;
    border-radius: 3px;
    padding: 10px 5px;
    margin: 5px 0 15px;

    &:focus {
      border-color: ${style.colors.lightBlue};
    }
  }
`;

export default FormWrapper;
