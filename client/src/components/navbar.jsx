import React from "react";
import "./Home.css";

const Navbar = ({ loading, user }) => {
  return (
    <header className="topbar">
      <div className="search">Search (Ctrl+K)</div>
      <div className="user-info">{loading ? "Loading..." : user ? user.name : "John Doe"}</div>
    </header>
  );
};

export default Navbar;