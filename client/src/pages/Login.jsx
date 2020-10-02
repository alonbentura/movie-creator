import React from "react";
import { useState } from "react";
// import { History } from 'react-router-dom'
import api from "../api";

const Login = (props) => {
  const [password, setPass] = useState({});
  const [email, setEmail] = useState({});

  const sumbit = () => {
    api.checkUser({ email, password });
    // props.history.push("/movies/list")
  };

  return (
    <div className="loginPage">
      <div className="container">
        <input
          type="txt"
          label="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          label="password"
          placeholder="password"
          onChange={(e) => setPass(e.target.value)}
        ></input>
        <button className="btn" onClick={sumbit}>
          Login
        </button>
      </div>
    </div>
  );
};
export default Login;
