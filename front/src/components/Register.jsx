import React, { useState } from "react";

import { userActions } from "../services/userServices";

function Register({ changeForm }) {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (data) => {
    console.log("data", data);
    // userActions.register(data);
    changeForm();
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
      <p>
        Already have an account? <span onClick={changeForm}>Login</span>
      </p>
    </div>
  );
}

export default Register;
