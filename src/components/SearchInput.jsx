import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { NotesContext } from "../context/NotesContext";
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";

const SearchInput = () => {
  const { user } = useUser();
  const notesContext = useContext(NotesContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const handleInputChange = async (e) => {
    const newQuery = e.target.value;
    setSearchParams({ q: newQuery });
    await notesContext.search_Notes(user.id, newQuery);
  };

  return (
    <div className="search_input_div">
      <input
        type="text"
        placeholder="Search by title, content, or tags..."
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
      <div className="icon_search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="#0E121B"
            fillRule="evenodd"
            className="dark:fill-neutral-200"
            d="M11.248 3.5a7.289 7.289 0 1 0 0 14.577 7.289 7.289 0 0 0 0-14.577ZM2.46 10.79a8.789 8.789 0 1 1 17.577 0 8.789 8.789 0 0 1-17.577 0Z"
            clipRule="evenodd"
          ></path>
          <path
            fill="#0E121B"
            fillRule="evenodd"
            className="dark:fill-neutral-200"
            d="m16.736 15.648 5.616 5.6-1.06 1.063-5.615-5.601 1.06-1.062Z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default SearchInput;
