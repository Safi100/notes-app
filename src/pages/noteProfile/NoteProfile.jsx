import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { NotesContext } from "../../context/NotesContext";
import NotesBar from "../../components/NotesBar";
import DeleteAlert from "../../components/DeleteAlert";
import "./noteProfile.css";
import ArchiveAlert from "../../components/ArchiveAlert";
import UnArchiveAlert from "../../components/UnArchiveAlert";

const NoteProfile = ({ user }) => {
  const notesContext = useContext(NotesContext);

  const notify = () => toast.success("Note updated successfully!");
  const notify_archived = () => toast.success("Note archived successfully!");
  const notify_unarchived = () =>
    toast.success("Note unarchived successfully!");

  const { id } = useParams();
  const [note, setNote] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [openArchive, setOpenArchive] = useState(false);
  const [openUnArchive, setOpenUnArchive] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    content: "",
  });

  useEffect(() => {
    const getNotes = async () => {
      await notesContext.fetch_All_Notes(user.id);
    };
    getNotes();
  }, [user]);

  useEffect(() => {
    const getNodeById = async () => {
      const note = await notesContext.fetch_Note_By_Id(id, user.id);
      formData.title = note.title;
      formData.tags = note.tags;
      formData.content = note.content;
      setNote(note);
    };

    getNodeById();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.tags.trim() ||
      !formData.content.trim()
    ) {
      return;
    }

    const updatedNote = await notesContext.update_Note(
      note.id,
      formData,
      user.id
    );

    if (updatedNote) {
      setNote(updatedNote);
      notify();
    }
  };

  return (
    <div className="update_note_container">
      <Toaster position="bottom-right" reverseOrder={false} />
      {openDelete && (
        <DeleteAlert
          noteID={note.id}
          setOpenDelete={setOpenDelete}
          userID={user.id}
        />
      )}
      {openArchive && (
        <ArchiveAlert
          noteID={note.id}
          setOpenArchive={setOpenArchive}
          userID={user.id}
          setNote={setNote}
          notify={notify_archived}
        />
      )}
      {openUnArchive && (
        <UnArchiveAlert
          noteID={note.id}
          setOpenUnArchive={setOpenUnArchive}
          userID={user.id}
          setNote={setNote}
          notify={notify_unarchived}
        />
      )}
      <NotesBar notes={notesContext.notes} />
      <div className="update_note_row">
        <form className="update_note_form" onSubmit={handleSubmit}>
          <div className="mobile_control_profile">
            <a className="back" href="/">
              <img
                alt="icon"
                loading="lazy"
                width="24"
                height="24"
                decoding="async"
                data-nimg="1"
                src="https://briuwu-note-taking.vercel.app/images/icon-chevron-right.svg"
              />
              <span class="text-preset-5">Go Back</span>
            </a>
            <div className="buttons_div">
              {note.isArchived == false && (
                <button
                  type="button"
                  className="btn update_btn"
                  onClick={() => {
                    setOpenArchive(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
                </button>
              )}
              {note.isArchived == true && (
                <button
                  type="button"
                  className="btn unarchive_btn"
                  onClick={() => {
                    setOpenUnArchive(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
                </button>
              )}
              <button
                type="button"
                className="btn delete_btn"
                onClick={() => {
                  setOpenDelete(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 25"
                >
                  <path
                    stroke="#0E121B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    className="dark:stroke-white"
                    d="m14.852 3.879.818 1.785h2.64c.811 0 1.47.658 1.47 1.47V8.22c0 .555-.45 1.005-1.006 1.005H5.005C4.45 9.226 4 8.776 4 8.221V7.133c0-.811.658-1.47 1.47-1.47h2.639l.818-1.784c.246-.536.78-.879 1.37-.879h3.185c.59 0 1.125.343 1.37.879ZM18.24 9.3v8.686c0 1.665-1.333 3.014-2.977 3.014H8.517c-1.644 0-2.977-1.349-2.977-3.014V9.301M10.2 12.816v4.509m3.38-4.509v4.509"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="note_title_tag">
            <input
              className="title"
              type="text"
              name="title"
              placeholder="Enter a title..."
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <div className="tags">
              <div>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="#0E121B"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      className="dark:stroke-white"
                      d="M3.016 5.966c.003-1.411 1.07-2.677 2.456-2.916.284-.05 3.616-.042 4.995-.041 1.364 0 2.527.491 3.49 1.452 2.045 2.042 4.088 4.085 6.128 6.13 1.208 1.21 1.224 3.066.022 4.28a805.496 805.496 0 0 1-5.229 5.228c-1.212 1.201-3.069 1.186-4.279-.022-2.064-2.058-4.127-4.115-6.182-6.182-.795-.8-1.264-1.766-1.368-2.895-.084-.903-.035-4.26-.033-5.034Z"
                      clipRule="evenodd"
                    ></path>
                    <path
                      stroke="#0E121B"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      className="dark:stroke-white"
                      d="M9.907 8.315a1.607 1.607 0 0 1-1.61 1.583c-.872-.002-1.599-.73-1.594-1.596a1.604 1.604 0 0 1 1.633-1.607c.864.003 1.575.736 1.571 1.62Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Tags</span>
                </p>
                <input
                  className="tags_input"
                  type="text"
                  name="tags"
                  placeholder="Add tags separated by commas (e.g. Work, Planning)"
                  value={formData.tags}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {note.isArchived == true && (
                <div>
                  <p>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.65775 6.3478C5.92811 6.07743 6.36646 6.07742 6.63682 6.34778L7.51281 7.22375C7.78317 7.49411 7.78318 7.93245 7.51282 8.20282C7.24246 8.47319 6.80412 8.47319 6.53375 8.20283L5.65777 7.32687C5.3874 7.05651 5.38739 6.61816 5.65775 6.3478ZM7.51267 15.794C7.78312 16.0643 7.78324 16.5026 7.51295 16.7731L5.92417 18.3627C5.65388 18.6332 5.21553 18.6333 4.9451 18.363C4.67466 18.0927 4.67454 17.6545 4.94482 17.384L6.5336 15.7943C6.80389 15.5238 7.24224 15.5237 7.51267 15.794ZM15.1052 15.794C15.3756 15.5237 15.8139 15.5238 16.0842 15.7943L17.673 17.384C17.9433 17.6545 17.9432 18.0927 17.6727 18.363C17.4023 18.6333 16.964 18.6332 16.6937 18.3627L15.1049 16.7731C14.8346 16.5026 14.8347 16.0643 15.1052 15.794Z"
                        fill="#2B303B"
                        class="dark:fill-neutral-300"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.308 4.5835C11.6904 4.5835 12.0003 4.89346 12.0003 5.2758V5.93838C12.0003 6.32073 11.6904 6.63069 11.308 6.63069C10.9257 6.63069 10.6157 6.32073 10.6157 5.93838V5.2758C10.6157 4.89346 10.9257 4.5835 11.308 4.5835ZM2.82373 11.9989C2.82373 11.6166 3.13369 11.3066 3.51604 11.3066H5.24746C5.62981 11.3066 5.93977 11.6166 5.93977 11.9989C5.93977 12.3812 5.62981 12.6912 5.24746 12.6912H3.51604C3.13369 12.6912 2.82373 12.3812 2.82373 11.9989ZM16.6764 11.9989C16.6764 11.6166 16.9862 11.3066 17.3687 11.3066H19.6157C19.998 11.3066 20.308 11.6166 20.308 11.9989C20.308 12.3812 19.998 12.6912 19.6157 12.6912H17.3687C16.9862 12.6912 16.6764 12.3812 16.6764 11.9989ZM11.308 17.3672C11.6904 17.3672 12.0003 17.6772 12.0003 18.0596V20.3067C12.0003 20.689 11.6904 20.999 11.308 20.999C10.9257 20.999 10.6157 20.689 10.6157 20.3067V18.0596C10.6157 17.6772 10.9257 17.3672 11.308 17.3672Z"
                        fill="#2B303B"
                        class="dark:fill-neutral-300"
                      ></path>
                    </svg>
                    <span>Status</span>
                  </p>

                  <span className="arch_span">Archived</span>
                </div>
              )}
              <div>
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.2505 3.75C7.69378 3.75 4.00049 7.44329 4.00049 12C4.00049 16.5558 7.69384 20.25 12.2505 20.25C16.8072 20.25 20.5005 16.5558 20.5005 12C20.5005 7.44329 16.8072 3.75 12.2505 3.75ZM2.50049 12C2.50049 6.61487 6.86536 2.25 12.2505 2.25C17.6356 2.25 22.0005 6.61487 22.0005 12C22.0005 17.3841 17.6357 21.75 12.2505 21.75C6.8653 21.75 2.50049 17.3841 2.50049 12Z"
                      fill="#2B303B"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.9224 7.82666C12.3366 7.82666 12.6724 8.16245 12.6724 8.57666V12.2493L15.4819 13.9283C15.8375 14.1408 15.9535 14.6013 15.741 14.9569C15.5285 15.3124 15.068 15.4284 14.7124 15.2159L11.5376 13.3186C11.3111 13.1832 11.1724 12.9388 11.1724 12.6748V8.57666C11.1724 8.16245 11.5082 7.82666 11.9224 7.82666Z"
                      fill="#2B303B"
                    />
                  </svg>
                  <span>Last Edited</span>
                </p>
                <span className="last_edit">
                  {new Date(note.updatedat).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    timeZone: "UTC",
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="note_content">
            <textarea
              name="content"
              placeholder="Start typing your note here..."
              value={formData.content}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="button_div">
            <button className="btn update_btn">Update</button>
            <a href="/" className="btn cancel_btn">
              Cancel
            </a>
          </div>
        </form>
        <div className="control_note">
          {note.isArchived == false ? (
            <button onClick={() => setOpenArchive(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
              <span>Archive Note</span>
            </button>
          ) : (
            <button onClick={() => setOpenUnArchive(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
              <span>Unarchive Note</span>
            </button>
          )}
          <button onClick={() => setOpenDelete(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 25"
            >
              <path
                stroke="#0E121B"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                className="dark:stroke-white"
                d="m14.852 3.879.818 1.785h2.64c.811 0 1.47.658 1.47 1.47V8.22c0 .555-.45 1.005-1.006 1.005H5.005C4.45 9.226 4 8.776 4 8.221V7.133c0-.811.658-1.47 1.47-1.47h2.639l.818-1.784c.246-.536.78-.879 1.37-.879h3.185c.59 0 1.125.343 1.37.879ZM18.24 9.3v8.686c0 1.665-1.333 3.014-2.977 3.014H8.517c-1.644 0-2.977-1.349-2.977-3.014V9.301M10.2 12.816v4.509m3.38-4.509v4.509"
              ></path>
            </svg>
            <span>Delete Note</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteProfile;
