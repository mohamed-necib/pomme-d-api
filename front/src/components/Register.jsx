import React from "react";

function Register({ isRegister, changeForm }) {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button>Register</button>
      </form>
      <p>
        Already have an account? <span onClick={changeForm}>Login</span>
      </p>
    </div>
  );
}

export default Register;
