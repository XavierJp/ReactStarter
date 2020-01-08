import styled from "styled-components";

interface IProps {
  color?: string;
}

const Spinner = styled.div<IProps>`
  .loader {
    border: 16px solid rgba(255, 255, 255, 0.2); /* Light grey */
    border-top: 16px solid ${props => props.color || "#fff"};
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }

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
