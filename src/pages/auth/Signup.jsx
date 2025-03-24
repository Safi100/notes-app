import React from "react";
import { SignUp } from "@clerk/clerk-react";
import "./auth.css";
const Signup = () => {
  return (
    <div className="auth_bg">
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
};

export default Signup;
