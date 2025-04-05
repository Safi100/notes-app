import { use, useEffect, useState } from "react";
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
  const { user } = useUser();
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
            <SignedIn>
              <LayoutWithSidebar tags={tags}>
                <HeaderBar />
                <Home user={user} />
              </LayoutWithSidebar>
            </SignedIn>
          }
        />
        <Route
          path="/archives"
          element={
            <SignedIn>
              <LayoutWithSidebar tags={tags}>
                <HeaderBar />
                <ArchivedNotes user={user} />
              </LayoutWithSidebar>
            </SignedIn>
          }
        />
        <Route
          path="/note/create"
          element={
            <SignedIn>
              <LayoutWithSidebar tags={tags}>
                <HeaderBar />
                <CreateNote user={user} />
              </LayoutWithSidebar>
            </SignedIn>
          }
        />
        <Route
          path="/settings"
          element={
            <SignedIn>
              <LayoutWithSidebar tags={tags}>
                <HeaderBar />
                <Settings user={user} />
              </LayoutWithSidebar>
            </SignedIn>
          }
        />
        <Route
          path="/settings/color-theme"
          element={
            <SignedIn>
              <LayoutWithSidebar tags={tags}>
                <HeaderBar />
                <ColorTheme user={user} />
              </LayoutWithSidebar>
            </SignedIn>
          }
        />
        <Route
          path="/settings/font-theme"
          element={
            <SignedIn>
              <LayoutWithSidebar tags={tags}>
                <HeaderBar />
                <FontTheme user={user} />
              </LayoutWithSidebar>
            </SignedIn>
          }
        />
        <Route
          path="/note/:id"
          element={
            <SignedIn>
              <LayoutWithSidebar tags={tags}>
                <HeaderBar />
                <NoteProfile user={user} />
              </LayoutWithSidebar>
            </SignedIn>
          }
        />
        <Route path="/tags" element={<Tags user={user} />} />
        <Route path="/search" element={<Search user={user} />} />
        <Route path="/sign-in/*" element={<SignIn />} />
        <Route path="/sign-up/*" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
