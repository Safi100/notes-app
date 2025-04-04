import React from "react";
import "./components.css";

const AddNoteButton = () => {
  return (
    <a href="/note/create" className="add_note_btn">
      <span>+ Create New Note</span>
      <div className="plus">
        <img
          alt=""
          loading="lazy"
          width="24"
          height="24"
          decoding="async"
          data-nimg="1"
          src="/assets/icon-plus.svg"
        />
      </div>
    </a>
  );
};

export default AddNoteButton;
