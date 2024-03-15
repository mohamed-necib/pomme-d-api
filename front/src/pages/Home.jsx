import React, { useContext } from "react";

import { UserContext } from "../context/userContext";
import { userActions } from "../services/userServices";

function Home() {
  const { user, setUser, connected, setConnected, handleLogout } =
    useContext(UserContext);

  const logOut = async () => {
    const res = await userActions.logout();
    if (res) {
      handleLogout();
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to our website</p>
      {connected ? (
        <button onClick={logOut}>Logout</button>
      ) : (
        <p>Please login to access the website</p>
      )}
    </div>
  );
}

export default Home;
