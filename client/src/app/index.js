import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { NavBar } from "../components";
import { MoviesList, MoviesInsert, MoviesUpdate } from "../pages";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { PrivateRoute } from "./privateRoute";

function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Switch>
        <Route path="/" exact component={SignUp}></Route>
        <Route path="/login" exact component={Login}></Route>
        <PrivateRoute path="/movies/list" exact component={MoviesList} />
        <PrivateRoute path="/movie/create" exact component={MoviesInsert} />
        <PrivateRoute path="/user/movie/update" component={MoviesUpdate} />
      </Switch>
    </Router>
  );
}

export default App;
