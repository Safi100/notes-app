import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchNotes } from "../../db/queries";
import Note from "../../components/Note";
import SearchInput from "../../components/SearchInput";
import "./search.css";

const Search = ({ user }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);

  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (!user) return;

    const fetchNotes = async () => {
      const results = await searchNotes(user.id, query);
      setNotes(results);
    };

    fetchNotes();
  }, [query, user]);

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
        {notes?.map((note, index) => (
          <Note
            key={note.id}
            note={note}
            isLastNote={index === notes.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
