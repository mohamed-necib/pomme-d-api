import { useState } from "react";

import Register from "../components/Register";
import Login from "../components/Login";

function Authentication() {
  const [isRegister, setIsRegister] = useState(true);

  const changeForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div>
      <h1>Inscription/connexion</h1>
      {isRegister ? (
        <Register changeForm={changeForm} />
      ) : (
        <Login changeForm={changeForm} />
      )}
    </div>
  );
}

export default Authentication;
