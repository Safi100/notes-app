import React from "react";
import { SignIn } from "@clerk/clerk-react";

const Signin = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
};

export default Signin;
