import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";

import SignIn from "./pages/auth/Signin";
import SignUp from "./pages/auth/Signup";
import Home from "./pages/home/Home";
import Tags from "./pages/tags/Tags";
import ArchivedNotes from "./pages/archived_notes/ArchivedNotes";
import Search from "./pages/search/Search";
import CreateNote from "./pages/createNote/CreateNote";
import NoteProfile from "./pages/noteProfile/NoteProfile";
import Settings from "./pages/settings/Settings";
import ColorTheme from "./pages/settings/ColorTheme";
import FontTheme from "./pages/settings/FontTheme";

import MobileNav from "./components/MobileNav";
import MobileHeader from "./components/MobileHeader";
import SideBar from "./components/SideBar";
import HeaderBar from "./components/HeaderBar";
import { getAllTags } from "./db/queries";
import Loading from "./components/Loading";

// Layout component for pages with Sidebar
function LayoutWithSidebar({ children, tags }) {
  return (
    <div className="app-layout">
      <SideBar tags={tags} />
      <div className="page_content">{children}</div>
    </div>
  );
}

function App() {
  const { user, isLoaded } = useUser(); // Added isLoaded to check if the user state is loaded
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      if (user) {
        const tags = await getAllTags(user.id);
        setTags(tags);
      }
    };
    fetchTags();
  }, [user]);

  if (!isLoaded) {
    // If the user state is still loading, don't redirect and return a loading state
    return <Loading />;
  }

  return (
    <>
      <SignedIn>
        <MobileHeader />
        <MobileNav />
      </SignedIn>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <LayoutWithSidebar tags={tags}>
                <HeaderBar />
                <Home user={user} />
              </LayoutWithSidebar>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/archives"
          element={
            user ? (
              <LayoutWithSidebar tags={tags}>
                <HeaderBar />
                <ArchivedNotes user={user} />
              </LayoutWithSidebar>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/note/create"
          element={
            user ? (
              <LayoutWithSidebar tags={tags}>
                <HeaderBar />
                <CreateNote user={user} />
              </LayoutWithSidebar>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/settings"
          element={
            user ? (
              <LayoutWithSidebar tags={tags}>
                <HeaderBar />
                <Settings user={user} />
              </LayoutWithSidebar>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/settings/color-theme"
          element={
            user ? (
              <LayoutWithSidebar tags={tags}>
                <HeaderBar />
                <ColorTheme user={user} />
              </LayoutWithSidebar>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/settings/font-theme"
          element={
            user ? (
              <LayoutWithSidebar tags={tags}>
                <HeaderBar />
                <FontTheme user={user} />
              </LayoutWithSidebar>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/note/:id"
          element={
            user ? (
              <LayoutWithSidebar tags={tags}>
                <HeaderBar />
                <NoteProfile user={user} />
              </LayoutWithSidebar>
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/tags"
          element={user ? <Tags user={user} /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/search"
          element={user ? <Search user={user} /> : <Navigate to="/sign-in" />}
        />
        <Route path="/sign-in/*" element={<SignIn />} />
        <Route path="/sign-up/*" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
