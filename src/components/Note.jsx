import React from "react";

const Note = ({ note, isLastNote }) => {
  // Convert date string to readable format
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
      className={`block space-y-3 p-2 ${
        !isLastNote ? "border-b border-solid border-[--neutral-200]" : ""
      }`}
    >
      <p className="text-preset-3">{note.title}</p>
      <div className="flex flex-wrap gap-1">
        {note.tags?.map((tag, index) => (
          <span
            key={index}
            className="text-preset-6 rounded bg-neutral-200 px-[6px] py-[2px] text-neutral-950"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-preset-6 text-neutral-700 dark:text-neutral-300">
        {formatDate(note.created_at)}
      </p>
    </a>
  );
};

export default Note;
