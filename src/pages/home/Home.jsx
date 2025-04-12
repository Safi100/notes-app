import { useState, useEffect, useContext } from "react";
import { NotesContext } from "../../context/NotesContext";
import NotesBar from "../../components/NotesBar";
import "./home.css";

const Home = ({ user }) => {
  const notesContext = useContext(NotesContext);

  useEffect(() => {
    const getNotes = async () => {
      await notesContext.fetch_All_Notes(user.id);
    };
    getNotes();
  }, [user]);

  return <NotesBar notes={notesContext.notes} />;
};

export default Home;
