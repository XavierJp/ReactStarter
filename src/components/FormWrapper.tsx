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

  button,
  input,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
  }
`;

export default FormWrapper;
