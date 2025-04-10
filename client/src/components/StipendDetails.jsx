import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMoneyBillAlt, FaArrowDown, FaChartBar } from "react-icons/fa";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import "./Home.css";

const StipendDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(""); 
  const [semester, setSemester] = useState(""); 
  const [dept_id, setDeptId] = useState(""); 
  const [stipendData, setStipendData] = useState({
    highest_stipend: 0,
    lowest_stipend: 0,
    avg_stipend: 0,
  });

  useEffect(() => {
    const fetchStipendData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/get_stipend_details", {
          params: { year, semester, dept_id }
        });
        setStipendData(response.data);
      } catch (error) {
        console.error("Error fetching stipend details:", error);
      }
      setTimeout(() => setLoading(false), 1000);
    };
    
    fetchStipendData();
  }, [year, semester, dept_id]);

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
          <>
            <section className="overview">
              <h1>Stipend Details</h1>
              
              {/* Dropdown Selection */}
              <div className="filters">
                <div className="filters-1">
                  <label className="label">Year:</label>
                  <select className="select" value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value="">Select Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
                <div className="filters-1">
                  <label className="label">Semester:</label>
                  <select className="select" value={semester} onChange={(e) => setSemester(e.target.value)}>
                    <option value="">All Semesters</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>
                </div>
                <div className="filters-1">
                  <label className="label">Department:</label>
                  <select className="select" value={dept_id} onChange={(e) => setDeptId(e.target.value)}>
                    <option value="">Select Department</option>
                    <option value="1">CSE</option>
                    <option value="2">CSBS</option>
                    <option value="3">AIDS</option>
                    <option value="4">CSF</option>
                  </select>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="stats">
                <div className="stat-card">
                  <FaMoneyBillAlt className="icon" />
                  <h1>{stipendData.highest_stipend}</h1>
                  <h2>Highest Stipend</h2>
                </div>
                <div className="stat-card">
                  <FaArrowDown className="icon" />
                  <h1>{stipendData.lowest_stipend}</h1>
                  <h2>Lowest Stipend</h2>
                </div>
                <div className="stat-card">
                  <FaChartBar className="icon" />
                  <h1>{stipendData.avg_stipend}</h1>
                  <h2>Average Stipend</h2>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default StipendDetails;
