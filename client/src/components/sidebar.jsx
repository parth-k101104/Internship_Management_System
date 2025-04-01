import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Ensure you have axios imported
import "./Home.css";

const Sidebar = () => {
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

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      if (response.data.status === "success") {
        navigate("/"); // Redirect to login page after logout
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
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
