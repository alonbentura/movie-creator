import React from "react";
import { useState } from "react";
// import { History } from 'react-router-dom'

const Login = (props) => {
const [password , setPass] = useState({});
const [userName , setUserName] = useState({});



const sumbit = () =>{
props.history.push("/movies/list")
}

  return (
    <div className="loginPage">
      <div className="container">
        <input type="txt" label="userName" onChange={(e) => setUserName(e.target.value)}></input>
        <input type="password" label="password" onChange={(e) =>setPass(e.target.value)}></input>
        <button className="btn" onClick={sumbit}>Login</button>
      </div>
    </div>
  );
};
export default Login;
