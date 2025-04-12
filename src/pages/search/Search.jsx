import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Note from "../../components/Note";
import SearchInput from "../../components/SearchInput";
import { NotesContext } from "../../context/NotesContext";
import "./search.css";

const Search = ({ user }) => {
  const notesContext = useContext(NotesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchNotes = async () => {
      await notesContext.fetch_All_Notes(user.id);
    };

    fetchNotes();
  }, [user]);

  useEffect(() => {
    const handleCheck = () => {
      if (window.innerWidth >= 1024) {
        navigate("/");
      }
    };

    handleCheck(); // Run on mount

    window.addEventListener("scroll", handleCheck);
    window.addEventListener("resize", handleCheck);

    return () => {
      window.removeEventListener("scroll", handleCheck);
      window.removeEventListener("resize", handleCheck);
    };
  }, [navigate]);

  return (
    <div className="search-container">
      <div className="search_div">
        <p>Search</p>
        <SearchInput />
      </div>
      <div className="notes">
        {notesContext.notes?.map((note, index) => (
          <Note
            key={note.id}
            note={note}
            isLastNote={index === notesContext.notes.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
