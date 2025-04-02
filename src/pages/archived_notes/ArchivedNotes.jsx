import React, { useEffect, useState } from "react";
import { fetchAllArchivedNotes } from "../../db/queries";
import NotesBar from "../../components/NotesBar";

const ArchivedNotes = ({ user }) => {
  const [archivedNotes, setArchivedNotes] = useState([]);

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
