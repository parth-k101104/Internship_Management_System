import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

const SchoolSupervisorTable = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSupervisors = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/get_school_supervisors");
        setSupervisors(response.data.supervisors || []);
      } catch (error) {
        console.error("Error fetching school supervisors:", error);
      }
      setTimeout(() => setLoading(false), 1000); // Add slight delay for smoother transition
    };
  
    fetchSupervisors();
  }, []);

  return (
        <div className="dashboard-container">
          <Sidebar />
          <main className="content">
            <Navbar />
            {loading ? (
            <div className="loading-container">
              <p className="loading-text">Loading School Supervisors...</p>
            </div>
          ) : (
              <div className="table">
                <h2 className="mid">School Supervisors</h2>
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>Supervisor ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Department</th>
                      <th>Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supervisors.length > 0 ? (
                      supervisors.map((supervisor) => (
                        <tr key={supervisor.supervisor_id}>
                          <td>{supervisor.supervisor_id}</td>
                          <td>{`${supervisor.first_name} ${supervisor.middle_name || ''} ${supervisor.last_name}`}</td>
                          <td>{supervisor.email}</td>
                          <td>{supervisor.phone}</td>
                          <td>{supervisor.department}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">No supervisors found for the selected criteria.</td>
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

export default SchoolSupervisorTable;