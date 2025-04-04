import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllNotes, searchNotes, addNote } from "../../db/queries";
import NotesBar from "../../components/NotesBar";
import "./createNote.css";

const CreateNote = ({ user }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    content: "",
  });
  const [notes, setNotes] = useState([]);

  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (!user) return;

    const fetchNotes = async () => {
      const results = await searchNotes(user.id, query);
      setNotes(results);
    };

    fetchNotes();
  }, [query, user]);

  useEffect(() => {
    const getNotes = async () => {
      const notes = await fetchAllNotes(user.id);
      setNotes(notes);
      console.log(notes);
    };

    getNotes();
  }, [user]);

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

    const newNote = await addNote(formData, user);

    if (newNote) {
      setNotes([newNote, ...notes]);
      setFormData({ title: "", tags: "", content: "" });
    }
  };

  return (
    <div className="create_note_container">
      <NotesBar notes={notes} />
      <div className="create_note_row">
        <form className="create_note_form" onSubmit={handleSubmit}>
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.8"
                      class="dark:stroke-white"
                      d="M3.016 5.966c.003-1.411 1.07-2.677 2.456-2.916.284-.05 3.616-.042 4.995-.041 1.364 0 2.527.491 3.49 1.452 2.045 2.042 4.088 4.085 6.128 6.13 1.208 1.21 1.224 3.066.022 4.28a805.496 805.496 0 0 1-5.229 5.228c-1.212 1.201-3.069 1.186-4.279-.022-2.064-2.058-4.127-4.115-6.182-6.182-.795-.8-1.264-1.766-1.368-2.895-.084-.903-.035-4.26-.033-5.034Z"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      stroke="#0E121B"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.8"
                      class="dark:stroke-white"
                      d="M9.907 8.315a1.607 1.607 0 0 1-1.61 1.583c-.872-.002-1.599-.73-1.594-1.596a1.604 1.604 0 0 1 1.633-1.607c.864.003 1.575.736 1.571 1.62Z"
                      clip-rule="evenodd"
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
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.2505 3.75C7.69378 3.75 4.00049 7.44329 4.00049 12C4.00049 16.5558 7.69384 20.25 12.2505 20.25C16.8072 20.25 20.5005 16.5558 20.5005 12C20.5005 7.44329 16.8072 3.75 12.2505 3.75ZM2.50049 12C2.50049 6.61487 6.86536 2.25 12.2505 2.25C17.6356 2.25 22.0005 6.61487 22.0005 12C22.0005 17.3841 17.6357 21.75 12.2505 21.75C6.8653 21.75 2.50049 17.3841 2.50049 12Z"
                      fill="#2B303B"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.9224 7.82666C12.3366 7.82666 12.6724 8.16245 12.6724 8.57666V12.2493L15.4819 13.9283C15.8375 14.1408 15.9535 14.6013 15.741 14.9569C15.5285 15.3124 15.068 15.4284 14.7124 15.2159L11.5376 13.3186C11.3111 13.1832 11.1724 12.9388 11.1724 12.6748V8.57666C11.1724 8.16245 11.5082 7.82666 11.9224 7.82666Z"
                      fill="#2B303B"
                    />
                  </svg>
                  <span>Last Edited</span>
                </p>
                <span className="last_edit">Not yet saved.</span>
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
            <button>Submit</button>
          </div>
        </form>
        <div className="control_note"></div>
      </div>
    </div>
  );
};

export default CreateNote;
