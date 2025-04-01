import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {FaUserFriends, FaBuilding, FaChartLine, FaBriefcase, FaMoneyBillAlt, FaArrowDown, FaChartBar, FaMapMarkerAlt } from "react-icons/fa";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import "./Home.css";

const StudentDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState({
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

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_student_details");
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar navigate={navigate} />
      <main className="content">
        <Navbar />

        {loading ? (
          <div className="loading-container">
            <p className="loading-text">Loading Student Details...</p>
          </div>
        ) : (
          <section className="overview">
            <h1>Student Details</h1>
            <div className="stats">
              <div className="stat-card">
                <FaUserFriends className="icon" />
                <h1>{studentData.total_students}</h1>
                <h2>Total Students</h2>
              </div>
              <div className="stat-card">
                <FaBuilding className="icon" />
                <h1>{studentData.on_campus_students}</h1>
                <h2>On-Campus Placement</h2>
              </div>
              <div className="stat-card">
                <FaBriefcase className="icon" />
                <h1>{studentData.off_campus_students}</h1>
                <h2>Off-Campus Placement</h2>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default StudentDetails;