import { createContext, useContext, useState } from "react";
import {
  fetchAllArchivedNotes,
  fetchNoteById,
  fetchAllNotes,
  getAllTags,
  deleteNote,
  addNote,
  searchNotes,
  searchArchivedNotes,
  updateNote,
  archiveNote,
  unarchiveNote,
} from "../db/queries";

export const NotesContext = createContext([]);

export function NotesContextProvider({ children }) {
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState([]);

  const fetch_All_Notes = async (userID) => {
    const allNotes = await fetchAllNotes(userID);
    setNotes(allNotes);
  };
  const fetch_All_Archived_Notes = async (userID) => {
    const allNotes = await fetchAllArchivedNotes(userID);
    setNotes(allNotes);
  };
  const fetchAllTags = async (userID) => {
    const allTags = await getAllTags(userID);
    setTags(allTags);
  };
  const delete_Note = async (noteID, userID) => {
    await deleteNote(noteID, userID);
  };
  const archive_Note = async (noteID, userID) => {
    const archived_note = await archiveNote(noteID, userID);
    if (archived_note) {
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== archived_note.id)
      );
      fetchAllTags(userID);
      return archived_note;
    }
  };
  const unArchive_Note = async (noteID, userID) => {
    const unarchived_note = await unarchiveNote(noteID, userID);
    if (unarchived_note) {
      setNotes((prevNotes) => [...prevNotes, unarchived_note]);
      fetchAllTags(userID);
      return unarchived_note;
    }
  };
  const search_Notes = async (userID, query) => {
    const notes = await searchNotes(userID, query);
    setNotes(notes);
  };
  const search_Archived_Notes = async (userID, query) => {
    const notes = await searchArchivedNotes(userID, query);
    setNotes(notes);
  };

  const createNote = async (noteData, userID) => {
    const newNote = await addNote(noteData, userID);
    if (newNote) {
      fetchAllTags(userID);
      setNotes((prevNotes) => [...prevNotes, newNote]);
      return newNote;
    }
  };

  const fetch_Note_By_Id = async (noteID, userID) => {
    const note = await fetchNoteById(noteID, userID);
    return note;
  };

  const update_Note = async (noteID, updatedNoteData, userID) => {
    const updated_Note = await updateNote(noteID, updatedNoteData, userID);
    if (updated_Note) {
      fetchAllTags(userID);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updated_Note.id ? updated_Note : note
        )
      );
      return updated_Note;
    }
  };

  return (
    <NotesContext.Provider
      value={{
        tags,
        notes,
        fetch_All_Notes,
        fetchAllTags,
        delete_Note,
        createNote,
        search_Notes,
        fetch_All_Archived_Notes,
        search_Archived_Notes,
        fetch_Note_By_Id,
        update_Note,
        archive_Note,
        unArchive_Note,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
