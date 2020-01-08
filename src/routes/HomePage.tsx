import React from "react";

import { UserContext } from "src/context";

const HomePage: React.FC<{}> = () => (
  <UserContext.Consumer>
    {({ user }) => {
      return <div>{user ? user.name : "Hello"}</div>;
    }}
  </UserContext.Consumer>
);

export default HomePage;
