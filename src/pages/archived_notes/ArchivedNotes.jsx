import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { NotesContext } from "../../context/NotesContext";
import { fetchAllArchivedNotes, searchArchivedNotes } from "../../db/queries";
import NotesBar from "../../components/NotesBar";

const ArchivedNotes = ({ user }) => {
  const notesContext = useContext(NotesContext);

  useEffect(() => {
    const getArchivedNotes = async () => {
      await notesContext.fetch_All_Archived_Notes(user.id);
    };
    getArchivedNotes();
  }, [user]);

  return <NotesBar notes={notesContext.notes} />;
};

export default ArchivedNotes;
