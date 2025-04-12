import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

import "./components.css";

const UnArchiveAlert = ({
  noteID,
  setOpenUnArchive,
  userID,
  setNote,
  notify,
}) => {
  const noteContext = useContext(NotesContext);

  const handleUnArchive = async (noteID, userID) => {
    const updatedNote = await noteContext.unArchive_Note(noteID, userID);
    if (updatedNote) {
      setOpenUnArchive(false);
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
              style={{ transform: "rotate(180deg)" }}
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
            <h2>Unarchive Note</h2>
            <p>
              Are you sure you want to Unarchive this note? You can find it in
              the Unarchived Notes section and restore it anytime.
            </p>
          </div>
        </div>
        <div className="buttons_div">
          <button
            className="cancel_btn"
            onClick={() => setOpenUnArchive(false)}
          >
            Cancel
          </button>
          <button
            className="archive_btn"
            onClick={() => handleUnArchive(noteID, userID)}
          >
            Unarchive Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnArchiveAlert;
