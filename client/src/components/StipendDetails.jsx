import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserFriends, FaBuilding, FaChartLine } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Home.css";

const StipendDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [studentData, setStipendData] = useState({
    total_students: 0,
    on_campus: 0,
    off_campus: 0,
  });

  useEffect(() => {
    // Simulate a loading delay of 1 second
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar navigate={navigate} />
      <main className="content">
        <Navbar />

        {loading ? (
          <div className="loading-container">
            <p className="loading-text">Loading Stipend Details...</p>
          </div>
        ) : (
          <section className="overview">
            <h1>Stipend Details</h1>
            <div className="stats">
              <div className="stat-card">
                <FaUserFriends className="icon" />
                <h1>{studentData.total_students}</h1>
                <h2>Highest Stipend</h2>
              </div>
              <div className="stat-card">
                <FaBuilding className="icon" />
                <h1>{studentData.on_campus}</h1>
                <h2>Lowest Stipend</h2>
              </div>
              <div className="stat-card">
                <FaChartLine className="icon" />
                <h1>{studentData.off_campus}</h1>
                <h2>Average Stipend</h2>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default StipendDetails;