import styled from "styled-components";

interface IProps {
  color?: string;
}

const Spinner = styled.div<IProps>`
  border: 2px solid rgba(255, 255, 255, 0.2); /* Light grey */
  border-top: 2px solid ${props => props.color || "#fff"};
  border-radius: 50%;
  width: 12px;
  height: 12px;
  animation: spin 600ms linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
