import React, { useState, useContext, useEffect } from "react";
// utiliser react-router-dom pour rediriger l'utilisateur
import { useNavigate } from "react-router-dom";

import { userActions } from "../services/userServices";
import { UserContext } from "../context/userContext";

function Login({ changeForm }) {
  const navigate = useNavigate();
  const { user, setUser, connected, setConnected } = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    pseudo: "",
    password: "",
  });

  const [response, setResponse] = useState({});

  const handleSubmit = async (data) => {
    let formData = new FormData();
    formData.append("pseudo", data.pseudo);
    formData.append("password", data.password);

    const res = await userActions.login(formData);
    console.log("res", res);
    setResponse(res);
    if (res.success) {
      setTimeout(() => {
        setResponse({});
        setUser({
          pseudo: data.pseudo,
          id: res.id,
        });
        setConnected(true);
        navigate("/");
      }, 1500);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          type="text"
          placeholder="pseudo"
          onChange={(e) =>
            setLoginData({ ...loginData, pseudo: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <input
          type="submit"
          value="Login"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(loginData);
          }}
        />
      </form>
      {response?.success ? (
        <p style={{ color: "green" }}>{response.message}</p>
      ) : (
        <p style={{ color: "red" }}>{response.message}</p>
      )}

      <p>
        Don't have an account? <span onClick={changeForm}>Register</span>
      </p>
    </div>
  );
}

export default Login;
