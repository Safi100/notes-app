import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllNotes, searchNotes } from "../../db/queries";
import NotesBar from "../../components/NotesBar";
import "./home.css";

const Home = ({ user }) => {
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
