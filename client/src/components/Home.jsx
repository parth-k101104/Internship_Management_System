import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("http://localhost:5000/check_session", { withCredentials: true });
        if (response.data.logged_in) {
          setUser(response.data.user);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Session check error:", error);
        navigate("/");
      }
    };

    checkSession();
  }, [navigate]);

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
    <div className="home-container">
      {user ? <h1>Welcome, {user.name}!</h1> : <h1>Loading...</h1>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
