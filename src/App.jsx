import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";

import { MobileNav } from "./components/MobileNav";

function App() {
  const { user } = useUser();
  // hide nav on /sign-in and /sign-up
  const hideNav =
    location.pathname.startsWith("/sign-in") ||
    location.pathname.startsWith("/sign-up");

  return (
    <>
      {!hideNav && (
        <SignedIn>
          <MobileNav />
        </SignedIn>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Home user={user} />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" replace />
              </SignedOut>
            </>
          }
        />
        <Route path="/sign-up/*" element={<SignUp />} />
        <Route path="/sign-in/*" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
