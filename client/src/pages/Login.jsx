import React from "react";

const Login = () => {
  return (
    <div className="loginPage">
      <div className="container">
        <input type="txt" label="userName"></input>
        <input type="password" label="password"></input>

        <button className="btn">Login</button>
      </div>
    </div>
  );
};
export default Login;
