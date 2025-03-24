import { useState, useEffect } from "react";
import { getAllTags } from "../../db/queries";
import "./tags.css";

const Tags = ({ user }) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchTags = async () => {
      const userTags = await getAllTags(user.id);
      setTags(userTags);
    };
    fetchTags();
  }, [user]);
  return (
    <div className="tags_div">
      <p>Tags</p>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>
            <a href={`/notes?tag=${tag}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
              {tag}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
