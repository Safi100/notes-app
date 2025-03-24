import React from "react";
import "./components.css";

const AddNoteButtonMobile = () => {
  return (
    <a href="/note/new" className="add_note_btn">
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

export default AddNoteButtonMobile;
