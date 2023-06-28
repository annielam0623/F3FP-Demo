import React, { Component } from "react";
import SignInForm from "./SignInForm";

export default class SignInPage extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3"></div>
        <h2>Welcome Back</h2>
        <div className="col-md-6">
          <SignInForm />
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}
