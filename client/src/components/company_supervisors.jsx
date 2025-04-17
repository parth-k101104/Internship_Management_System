import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import "./Home.css";

const CompanySupervisors = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    const fetchSupervisorData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/get_supervisor_details");
        setSupervisors(response.data.supervisors);
      } catch (error) {
        console.error("Error fetching supervisor details:", error);
      }
      setTimeout(() => setLoading(false), 1000);
    };

    fetchSupervisorData();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar navigate={navigate} />
      <main className="content">
        <Navbar />
        {loading ? (
          <div className="loading-container">
            <p className="loading-text">Loading Supervisor Details...</p>
          </div>
        ) : (
          <div className="table">
            <h2>Company Supervisors List</h2>
            <table className="student-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company Name</th>
                </tr>
              </thead>
              <tbody>
                {supervisors.length > 0 ? (
                  supervisors.map((supervisor) => (
                    <tr key={supervisor.id}>
                      <td>{supervisor.id}</td>
                      <td>{`${supervisor.first_name} ${supervisor.last_name}`}</td>
                      <td>{supervisor.email}</td>
                      <td>{supervisor.phone}</td>
                      <td>{supervisor.company_name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No supervisors found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default CompanySupervisors;