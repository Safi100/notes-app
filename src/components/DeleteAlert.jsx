import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

import "./components.css";

const DeleteAlert = ({ noteID, setOpenDelete, userID }) => {
  const noteContext = useContext(NotesContext);

  return (
    <div className="blur">
      <div className="alert">
        <div className="heading">
          <div className="icon">
            <img
              alt="trash icon"
              loading="lazy"
              width="24"
              height="24"
              decoding="async"
              data-nimg="1"
              src="https://briuwu-note-taking.vercel.app/images/icon-delete.svg"
            />
          </div>
          <div className="text">
            <h2>Delete Note</h2>
            <p>
              Are you sure you want to permanently delete this note? This action
              cannot be undone.
            </p>
          </div>
        </div>
        <div className="buttons_div">
          <button className="cancel_btn" onClick={() => setOpenDelete(false)}>
            Cancel
          </button>
          <button
            className="delete_btn"
            onClick={() => noteContext.delete_Note(noteID, userID)}
          >
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
