import React from "react";
import "./components.css";
import { Link } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

const SettingsBar = () => {
  const { signOut } = useClerk(); // Get the signOut method from Clerk

  const handleLogout = () => {
    signOut(); // Call the signOut method to log out the user
  };

  return (
    <div className="settings_bar">
      <p>Settings</p>
      <div className="settings_controllers">
        <ul>
          <li
            className={
              location.pathname === "/settings/color-theme"
                ? "settings_active"
                : ""
            }
          >
            <Link to="/settings/color-theme">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#0E121B"
                  class="dark:stroke-white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12.055 3v1.372m0 15.256V21m9-9h-1.372M4.427 12H3.055m15.364-6.364-.97.97M6.66 17.394l-.97.97m12.728 0-.97-.97M6.66 6.606l-.97-.97"
                ></path>
                <path
                  stroke="#0E121B"
                  class="dark:stroke-white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12.055 7.805a4.195 4.195 0 1 1 0 8.39 4.195 4.195 0 0 1 0-8.39Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Color Theme</span>
              {location.pathname === "/settings/color-theme" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="arrow"
                >
                  <path
                    fill="#000"
                    fill-rule="evenodd"
                    class="dark:fill-white"
                    d="M9.47 7.47a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06L12.94 12 9.47 8.53a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              )}
            </Link>
          </li>
          <li
            className={
              location.pathname === "/settings/font-theme"
                ? "settings_active"
                : ""
            }
          >
            <Link to="/settings/font-theme">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#0E121B"
                  class="dark:fill-white"
                  fill-rule="evenodd"
                  d="M20.999 10.979H14.63a1 1 0 0 0-1 1v1.13a1 1 0 1 0 2 0v-.13h1.154v4.409h-.39a1 1 0 1 0 0 2h2.84a1 1 0 1 0 0-2h-.45v-4.41h1.214v.13a1 1 0 1 0 2 0v-1.13a1 1 0 0 0-1-1Z"
                  clip-rule="evenodd"
                ></path>
                <path
                  fill="#0E121B"
                  class="dark:fill-white"
                  fill-rule="evenodd"
                  d="M12.185 17.388H10.29V6.61h4.415v1.25a1 1 0 0 0 2 0V5.61a1 1 0 0 0-1-1H2.999a1 1 0 0 0-1 1v2.25a1 1 0 0 0 2 0V6.61H8.29v10.78H6.517a1 1 0 1 0 0 2h5.668a1 1 0 1 0 0-2Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Font Theme</span>
              {location.pathname === "/settings/font-theme" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="arrow"
                >
                  <path
                    fill="#000"
                    fill-rule="evenodd"
                    class="dark:fill-white"
                    d="M9.47 7.47a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06L12.94 12 9.47 8.53a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              )}
            </Link>
          </li>
        </ul>
        <div className="line"></div>
        <button
          class="inline-flex gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full items-start justify-start"
          component="SignOutButton"
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
              class="dark:stroke-white"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M21 11.998H8.945m12.055 0-2.932-2.934M21 11.998l-2.932 2.936M14.556 8.266V7.251c0-1.56-1.121-2.891-2.651-3.15L6.702 3.046C4.765 2.718 3 4.219 3 6.195v11.61c0 1.976 1.765 3.477 3.702 3.15l5.203-1.057a3.188 3.188 0 0 0 2.65-3.149v-1.014"
            ></path>
          </svg>
          <span onClick={handleLogout}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsBar;
