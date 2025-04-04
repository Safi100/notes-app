import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllArchivedNotes, searchArchivedNotes } from "../../db/queries";
import NotesBar from "../../components/NotesBar";

const ArchivedNotes = ({ user }) => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (!user) return;

    const fetchArchivedNotes = async () => {
      const results = await searchArchivedNotes(user.id, query);
      setArchivedNotes(results);
    };

    fetchArchivedNotes();
  }, [query, user]);

  useEffect(() => {
    const getArchivedNotes = async () => {
      const notes = await fetchAllArchivedNotes(user.id);
      setArchivedNotes(notes);
      console.log(notes);
    };

    getArchivedNotes();
  }, [user]);
  return <NotesBar notes={archivedNotes} />;
};

export default ArchivedNotes;
