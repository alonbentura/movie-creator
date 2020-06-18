import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar } from "../components";
import { MoviesList, MoviesInsert, MoviesUpdate } from "../pages";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../pages/Login";

function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/movies/list" exact component={MoviesList} />
        <Route path="/movies/create" exact component={MoviesInsert} />
        <Route path="/movies/update/:id" exact component={MoviesUpdate} />
      </Switch>
    </Router>
  );
}

export default App;
