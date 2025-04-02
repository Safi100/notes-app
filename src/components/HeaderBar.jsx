import React from "react";
import "./components.css";
import { useLocation } from "react-router-dom";

const HeaderBar = () => {
  const { pathname } = useLocation();

  return (
    <header className="header_bar">
      <h1>
        {pathname === "/" && "All Notes"}
        {pathname === "/archives" && "Archived Notes"}
        {pathname.startsWith("/settings") && "Settings"}
      </h1>
      <div className="search_settigs"></div>
    </header>
  );
};

export default HeaderBar;
