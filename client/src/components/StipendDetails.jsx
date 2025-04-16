import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {FaMoneyBillAlt, FaArrowDown, FaChartBar} from "react-icons/fa";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import "./Home.css";
import StipendBarChart from "./StipendBarChart"; // adjust path if needed

const StipendDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [studentData, setStipendData] = useState({
    highest_stipend: 0,
    lowest_stipend: 0,
    avg_stipend: 0,
  });
  const [departmentStipendData, setDepartmentStipendData] = useState({});


  const [viewMode, setViewMode] = useState("graph"); // graph or table

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_stipend_details");
        setStipendData(response.data);
      } catch (error) {
        console.error("Error fetching stipend details:", error);
      }
    };
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchDepartmentStipendData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stipend/department-summary");
        setDepartmentStipendData(response.data);
      } catch (error) {
        console.error("Error fetching department-wise stipend details:", error);
      }
    };
    fetchDepartmentStipendData();
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

            {/* Stat Cards */}
            <div className="stats">
              <div className="stat-card">
                <FaMoneyBillAlt className="icon" />
                <h1>{studentData.highest_stipend}</h1>
                <h2>Highest Stipend</h2>
              </div>
              <div className="stat-card">
                <FaArrowDown className="icon" />
                <h1>{studentData.lowest_stipend}</h1>
                <h2>Lowest Stipend</h2>
              </div>
              <div className="stat-card">
                <FaChartBar className="icon" />
                <h1>{studentData.avg_stipend}</h1>
                <h2>Average Stipend</h2>
              </div>
            </div>

            {/* View Toggle */}
            <div className="toggle-buttons" style={{ margin: "20px 0" }}>
              <button
                className={viewMode === "graph" ? "active" : ""}
                onClick={() => setViewMode("graph")}
              >
                Graph View
              </button>
              <button
                className={viewMode === "table" ? "active" : ""}
                onClick={() => setViewMode("table")}
              >
                Table View
              </button>
            </div>
            <div className="data-view">
            {viewMode === "graph" ? (
              <StipendBarChart data={departmentStipendData} />
            ) : (
              <div className="table">
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Highest Stipend</td>
                      <td>{studentData.highest_stipend}</td>
                    </tr>
                    <tr>
                      <td>Average Stipend</td>
                      <td>{studentData.avg_stipend}</td>
                    </tr>
                    <tr>
                      <td>Lowest Stipend</td>
                      <td>{studentData.lowest_stipend}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default StipendDetails;