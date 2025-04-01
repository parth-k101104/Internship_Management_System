import React from "react";
import "./Home.css";

const Sidebar = ({ handleLogout }) => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">One</h2>
      <ul className="sidebar-menu">
        <li className="active">Dashboard</li>
        <li>Student Details</li>
        <li>Stipend Details</li>
        <li>Company Details</li>
        <li>School Supervisors</li>
        <li>Company Supervisors</li>
      </ul>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </aside>
  );
};

export default Sidebar;
