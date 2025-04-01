import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Navbar = () => {
  const [user, setUser] = useState(null); // state to store user info
  const [loading, setLoading] = useState(true); // state to track loading status
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("http://localhost:5000/check_session", { withCredentials: true });
        if (response.data.logged_in) {
          setUser(response.data.user);
        } else {
          navigate("/"); // Navigate to home or login if session is invalid
        }
      } catch (error) {
        console.error("Session check error:", error);
        navigate("/"); // Navigate to home or login in case of an error
      } finally {
        setLoading(false); // Set loading to false once the check is done
      }
    };

    checkSession();
  }, [navigate]); // Dependency array with navigate to re-run on its change

  return (
    <header className="topbar">
      <div className="user-info">
        {loading ? "Loading..." : user ? `Welcome, ${user.name}` : "Welcome, John Doe"}
      </div>
    </header>
  );
};

export default Navbar;
