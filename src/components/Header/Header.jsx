// External
import React from "react";
import { AiOutlineUser, AiOutlineSearch } from "react-icons/ai";

// Internal
import "./Header.css";

function Header() {
  return (
    <div className="Header">
      <h1 id="main-title">HDTVISRAEL</h1>
      <h2 id="sub-title">אתר הדילים של ישראל</h2>
      <div className="Header__buttons">
        <AiOutlineSearch />
        <AiOutlineUser />
      </div>
    </div>
  );
}

export default Header;
