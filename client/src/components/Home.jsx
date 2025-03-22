import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserFriends, FaShoppingCart, FaChartLine } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
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
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">One</h2>
        <ul className="sidebar-menu">
          <li className="active">Dashboard</li>
          <li>Tables</li>
          <li>Forms</li>
          <li>UI</li>
          <li>Responsive</li>
          <li>Styles</li>
          <li>Profile</li>
          <li>Login</li>
          <li>Error</li>
          <li className="dropdown">Dropdown</li>
          <li>GitHub</li>
          <li>React Version</li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="content">
        <header className="topbar">
          <div className="search">Search (Ctrl+K)</div>
          <div className="user-info">{loading ? "Loading..." : user ? user.name : "John Doe"}</div>
        </header>

        <section className="overview">
          <h1>Overview</h1>
          <div className="stats">
            <div className="stat-card up">
              <FaUserFriends className="icon" />
              <p>Clients</p>
              <h2>512</h2>
              <span className="increase">+12%</span>
              <AiFillSetting className="settings-icon" />
            </div>
            <div className="stat-card down">
              <FaShoppingCart className="icon" />
              <p>Sales</p>
              <h2>$7,770</h2>
              <span className="decrease">-12%</span>
              <AiFillSetting className="settings-icon" />
            </div>
            <div className="stat-card overflow">
              <FaChartLine className="icon" />
              <p>Performance</p>
              <h2>256%</h2>
              <span className="overflow-text">Overflow</span>
              <AiFillSetting className="settings-icon" />
            </div>
          </div>
        </section>

        <section className="transactions">
          <div className="transaction">
            <p>$375.53</p>
            <span>3 days ago via Turcotte</span>
            <span className="tag deposit">Deposit</span>
          </div>
          <div className="transaction">
            <p>$470.26</p>
            <span>3 days ago via Murazik - Graham</span>
            <span className="tag payment">Payment</span>
          </div>
          <div className="transaction">
            <p>$971.34</p>
            <span>5 days ago via Fahey - Keebler</span>
            <span className="tag invoice">Invoice</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
