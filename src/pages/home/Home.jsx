import { useState, useEffect } from "react";
import { fetchAllNotes } from "../../db/queries";
import "./home.css"; // 👈 include your styles
import NotesBar from "../../components/NotesBar";
import HeaderBar from "../../components/HeaderBar";

const Home = ({ user }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const notes = await fetchAllNotes(user.id);
      setNotes(notes);
      console.log(notes);
    };

    getNotes();
  }, [user]);

  return <NotesBar notes={notes} />;
};

export default Home;
