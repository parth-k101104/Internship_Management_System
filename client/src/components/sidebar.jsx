import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";

const Sidebar = ({ handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();  // Get current route (pathname)

  // Sidebar menu items
  const menuItems = [
    { name: "Dashboard", path: "/home" },
    { name: "Student Details", path: "/student-details" },
    { name: "Stipend Details", path: "/stipend-details" },
    { name: "Company Details", path: "/company-details" },
    { name: "School Supervisors", path: "/school-supervisors" },
    { name: "Company Supervisors", path: "/company-supervisors" },
  ];

  // Function to handle menu item click
  const handleItemClick = (path) => {
    navigate(path); // Navigate to the clicked path
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Internship Management</h2>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={location.pathname === item.path ? "active" : ""}
            onClick={() => handleItemClick(item.path)}  // Navigate to the selected route
          >
            {item.name}
          </li>
        ))}
      </ul>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </aside>
  );
};

export default Sidebar;