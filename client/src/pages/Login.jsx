import React from "react";
import { useState } from "react";
// import { History } from 'react-router-dom'
import api from "../api";

const Login = (props) => {
  const [password, setPass] = useState({});
  const [email, setEmail] = useState({});

  const sumbit = async () => {
    await api.getUser({ email, password }).then((res) => {
      localStorage.setItem("id_token", res.data.token);
    });
    props.history.push("/movies/list");
    // if (localStorage.getItem("id_token")) {
    // }
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
