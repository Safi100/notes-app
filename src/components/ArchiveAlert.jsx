import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

import "./components.css";

const ArchiveAlert = ({ noteID, setOpenArchive, userID, setNote, notify }) => {
  const noteContext = useContext(NotesContext);

  const handleArchive = async (noteID, userID) => {
    const updatedNote = await noteContext.archive_Note(noteID, userID);
    if (updatedNote) {
      setOpenArchive(false);
      setNote(updatedNote);
      notify();
    }
  };
  return (
    <div className="blur">
      <div className="alert">
        <div className="heading">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#0E121B"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                className="dark:stroke-neutral-200"
                d="M21 7.782v8.435C21 19.165 18.919 21 15.974 21H8.026C5.081 21 3 19.165 3 16.216V7.782C3 4.834 5.081 3 8.026 3h7.948C18.919 3 21 4.843 21 7.782Z"
              ></path>
              <path
                stroke="#0E121B"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                className="dark:stroke-neutral-200"
                d="m15 14-3.002 3L9 14M11.998 17v-7M20.934 7H3.059"
              ></path>
            </svg>
          </div>
          <div className="text">
            <h2>Archive Note</h2>
            <p>
              Are you sure you want to archive this note? You can find it in the
              Archived Notes section and restore it anytime.
            </p>
          </div>
        </div>
        <div className="buttons_div">
          <button className="cancel_btn" onClick={() => setOpenArchive(false)}>
            Cancel
          </button>
          <button
            className="archive_btn"
            onClick={() => handleArchive(noteID, userID)}
          >
            Archive Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchiveAlert;
