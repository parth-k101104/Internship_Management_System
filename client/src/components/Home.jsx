import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserFriends, FaBuilding, FaChartLine } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    total_students: 0,
    on_campus_companies: 0,
    off_campus_companies: 0
  });

  // useEffect(() => {
  //   const checkSession = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/check_session", { withCredentials: true });
  //       if (response.data.logged_in) {
  //         setUser(response.data.user);
  //       } else {
  //         navigate("/");
  //       }
  //     } catch (error) {
  //       console.error("Session check error:", error);
  //       navigate("/");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkSession();
  // }, [navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_dashboard_data");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

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
      <Sidebar handleLogout={handleLogout} />
      <main className="content">
        <Navbar loading={loading} user={user} />
        <section className="overview">
          <h1>Overview</h1>
          <div className="stats">
            <div className="stat-card">
              <FaUserFriends className="icon" />
              <h1>{dashboardData.total_students}</h1>
              <h2>Total Students</h2>
            </div>
            <div className="stat-card">
              <FaBuilding className="icon" />
              <h1>{dashboardData.on_campus_companies}</h1>
              <h2>On-Campus Companies</h2>
            </div>
            <div className="stat-card">
              <FaChartLine className="icon" />
              <h1>{dashboardData.off_campus_companies}</h1>
              <h2>Off-Campus Companies</h2>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
