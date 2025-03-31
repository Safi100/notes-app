import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";

import SignIn from "./pages/auth/Signin";
import SignUp from "./pages/auth/Signup";
import Home from "./pages/home/Home";
import Tags from "./pages/tags/Tags";

import MobileNav from "./components/MobileNav";
import MobileHeader from "./components/MobileHeader";
import SideBar from "./components/SideBar";
import { getAllTags } from "./db/queries";

function App() {
  const { user } = useUser();
  const [tags, setTags] = useState([]);
  // hide nav on /sign-in and /sign-up
  const hideNav =
    location.pathname.startsWith("/sign-in") ||
    location.pathname.startsWith("/sign-up");

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await getAllTags(user.id);
      setTags(tags);
    };
    fetchTags();
  }, [user]);

  return (
    <div>
      <SignedIn>
        <MobileHeader />
        <SideBar tags={tags} />
        <MobileNav />
      </SignedIn>
      {/* )} */}
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
        <Route path="/sign-up/*" element={<SignUp />} />
        <Route path="/tags" element={<Tags user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
