import React from "react";
import "./components.css";
import { Link, useParams } from "react-router-dom";

const Note = ({ note, isLastNote }) => {
  const { id } = useParams();

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
    <Link
      to={`/note/${note.id}`}
      className={`note ${!isLastNote ? "note--with-border" : ""} 
      ${id === note.id ? "selected_note" : ""}`}
    >
      <p className="note__title">{note.title}</p>
      <div className="note__tags">
        {note.tags?.split(",")?.map((tag, index) => (
          <span key={index} className="note__tag">
            {tag.trim()}
          </span>
        ))}
      </div>

      <p className="note__date">{formatDate(note.created_at)}</p>
    </Link>
  );
};

export default Note;
