import { useState, useEffect } from "react";
import { fetchAllNotes } from "../../db/queries";
import AddNoteButtonMobile from "../../components/AddNoteButton";
import Note from "../../components/Note";
import "./home.css"; // 👈 include your styles

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
      <div className="home__sidebar">
        <AddNoteButtonMobile />
        <div className="home__notes">
          {notes.map((note, index) => (
            <Note
              key={note.id}
              note={note}
              isLastNote={index === notes.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
