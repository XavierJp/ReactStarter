import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../context";
import style from "../const/style";

const Bar = styled.div`
  width: calc(100% - 30px);
  position: sticky;
  padding: 10px 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #f6f6f6;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.03);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LeftNav = styled.nav`
  flex-grow: 1;
`;

const RightNav = styled.nav`
    > a {
      text-decoration: none;
      color: ${style.colors.lightBlue};
      font-weight: 600;
      padding: 5px 0px;
      margin: 0 3px;

      &.signup {
        border: 1px solid ${style.colors.lightBlue};
        border-radius: 4px;

        &:hover {
          background-color: ${style.colors.lightBlue};
          color: #fff;
        }
      }
    }
  }
`;

const NavBar: React.FC<{}> = () => (
  <UserContext.Consumer>
    {({ isLoggedIn, logout, user }) => {
      return (
        <Bar>
          <LeftNav>{user && `Hello ${user.name} 🤓`}</LeftNav>
          <RightNav>
            {isLoggedIn && isLoggedIn() ? (
              <Link to="/" onClick={logout}>
                Log out
              </Link>
            ) : (
              <>
                <Link className="login" to="/login">
                  Log in
                </Link>
                <Link className="signup" to="/signup">
                  Sign up
                </Link>
              </>
            )}
          </RightNav>
        </Bar>
      );
    }}
  </UserContext.Consumer>
);

export default NavBar;
