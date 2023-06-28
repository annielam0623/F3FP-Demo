import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "../pages/App";
import SignUpPage from "../pages/SignUp/SignUpPage";
import NavBar from "../components/NavBar";

export default class index extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" component={App}></Route>
          <Route path="/signUpPage" component={SignUpPage}></Route>
        </Routes>
      </Router>
    );
  }
}
