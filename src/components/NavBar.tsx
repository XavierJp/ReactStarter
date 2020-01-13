import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { UserContext, actions } from "src/context/User";
import FancyLink from "src/uiComponents/FancyLink";

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
  flex-grow: 0;
`;

const NavBar: React.FC<{}> = () => {
  //@ts-ignore
  const [{ user }, dispatch] = useContext(UserContext);

  return (
    <Bar>
      <LeftNav>{user && `Hello ${user.name} 🤓`}</LeftNav>
      <RightNav>
        {user ? (
          <FancyLink isUnderlined={true}>
            <Link to="/login" onClick={() => dispatch(actions.logout())}>
              Se déconnecter
            </Link>
          </FancyLink>
        ) : (
          <>
            <FancyLink isUnderlined={true}>
              <Link className="login" to="/login">
                Se connecter
              </Link>
            </FancyLink>
            <FancyLink isButton={true}>
              <Link className="signup" to="/signup">
                S’inscrire
              </Link>
            </FancyLink>
          </>
        )}
      </RightNav>
    </Bar>
  );
};

export default NavBar;
