import React from "react";
import AddNoteButtonMobile from "./AddNoteButton";
import Note from "./Note";

const NotesBar = ({ notes = [] }) => {
  return (
    <div className="notes_bar">
      <AddNoteButtonMobile />
      <div className="notes">
        {notes?.length === 0 && (
          <p className="no_notes">
            You don't have any notes yet. Start a new note to capture your
            thoughts and ideas.
          </p>
        )}
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

export default NotesBar;
