import React from "react";
import { useState } from "react";
// import { History } from 'react-router-dom'
import api from "../api";

const SignUp = (props) => {
  const [password, setPass] = useState({});
  const [firstName, setUserFirstName] = useState({});
  const [lastName, setUserLastName] = useState({});
  const [email, setEmail] = useState({});

  const sumbit = () => {
    api.insertUser({ email, firstName, lastName, password });
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
          type="txt"
          label="firstName"
          placeholder="firstName"
          onChange={(e) => setUserFirstName(e.target.value)}
        ></input>
        <input
          type="txt"
          label="lastName"
          placeholder="lastName"
          onChange={(e) => setUserLastName(e.target.value)}
        ></input>
        <input
          type="password"
          label="password"
          placeholder="password"
          onChange={(e) => setPass(e.target.value)}
        ></input>
        <button className="btn" onClick={sumbit}>
          SignUp
        </button>
      </div>
    </div>
  );
};
export default SignUp;
