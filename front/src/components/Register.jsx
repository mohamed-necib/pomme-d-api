import React, { useState } from "react";

import { userActions } from "../services/userServices";

function Register({ changeForm }) {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [response, setResponse] = useState({});

  const handleSubmit = async (data) => {
    let formData = new FormData();
    formData.append("pseudo", data.username);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    const res = await userActions.register(formData);
    setResponse(res);
    if (res.success) {
      setTimeout(() => {
        setResponse({});
        changeForm();
      }, 1500);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setRegisterData({ ...registerData, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Confirm password"
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              confirmPassword: e.target.value,
            })
          }
        />
        <input
          type="submit"
          value="Register"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(registerData);
          }}
        />
      </form>
      {response?.success ? (
        <p>{response.message}</p>
      ) : (
        <p>{response.message}</p>
      )}
      <p>
        Already have an account? <span onClick={changeForm}>Login</span>
      </p>
    </div>
  );
}

export default Register;
