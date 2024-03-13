import React from "react";

function Login({ changeForm }) {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
      </form>
      <p>
        Don't have an account? <span onClick={changeForm}>Register</span>
      </p>
    </div>
  );
}

export default Login;
