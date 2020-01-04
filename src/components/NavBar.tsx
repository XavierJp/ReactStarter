import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

interface Props {
  loggedIn: boolean;
  logout: () => void;
}

const Bar = styled.div`
  width: 100%;
  position: sticky;
  border-bottom: 1px solid black;

  nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const NavBar: React.FC<Props> = props => (
  <Bar>
    <nav>
      {props.loggedIn ? (
        <Link to="/" onClick={props.logout}>
          Log out
        </Link>
      ) : (
        <>
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Log in</Link>
        </>
      )}
    </nav>
  </Bar>
);

export default NavBar;
