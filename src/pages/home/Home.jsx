import { useState, useEffect } from "react";
import { fetchAllNotes } from "../../db/queries";
import AddNoteButtonMobile from "../../components/AddNoteButton";
import Note from "../../components/Note";
import "./home.css"; // 👈 include your styles
import NotesBar from "../../components/notesBar";

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

  return (
    <div className="home">
      <NotesBar notes={notes} />
    </div>
  );
};

export default Home;
