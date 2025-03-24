import React from "react";
import "./components.css";

const Note = ({ note, isLastNote }) => {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  return (
    <a
      href={`/notes/${note.id}`}
      className={`note ${!isLastNote ? "note--with-border" : ""}`}
    >
      <p className="note__title">{note.title}</p>
      <div className="note__tags">
        {note.tags?.map((tag, index) => (
          <span key={index} className="note__tag">
            {tag}
          </span>
        ))}
      </div>

      <p className="note__date">{formatDate(note.created_at)}</p>
    </a>
  );
};

export default Note;
