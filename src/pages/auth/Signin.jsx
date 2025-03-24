import React from "react";
import { SignIn } from "@clerk/clerk-react";
import "./auth.css";

const Signin = () => {
  return (
    <div className="auth_bg">
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
};

export default Signin;
