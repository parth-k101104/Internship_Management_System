import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserFriends, FaBuilding, FaBriefcase } from "react-icons/fa";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import StudentDetailSummaryChart from "./StudentDetailSummaryChart";
import "./Home.css";

const StudentDetails = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [dept_id, setDeptId] = useState("");
  const [StudentGraphData, setStudentGraphData] = useState([]);
  const [studentData, setStudentData] = useState({
    total_students: 0,
    on_campus_students: 0,
    off_campus_students: 0,
  });
  const [students, setStudents] = useState([]);

  const [graphDeptFilter, setGraphDeptFilter] = useState("");
  const [graphTypeFilter, setGraphTypeFilter] = useState("");

  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/get_student_details", {
          params: { year, semester, dept_id }
        });
        setStudentData(response.data.stats);
        setStudents(response.data.students);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
      setTimeout(() => setLoading(false), 1000);
    };

    fetchStudentData();
  }, [year, semester, dept_id]);

  useEffect(() => {
    const fetchStudentSummaryData = async () => {
      if (!graphDeptFilter || !graphTypeFilter) return;
  
      setLoading(true); // Optional: if you want to show loading during graph fetch
  
      try {
        const response = await axios.get("http://localhost:5000/api/stipend/year-wise-student-summary", {
          params: {
            department: graphDeptFilter,
            category: graphTypeFilter
          }
        });
  
        setStudentGraphData(response.data); // Updated variable name
      } catch (error) {
        console.error("Error fetching student summary data:", error);
      }
  
      setLoading(false); // Optional
    };
  
    fetchStudentSummaryData();
  }, [graphDeptFilter, graphTypeFilter]);

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

            {/* Stat Cards */}
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

            {/* Top Filters */}
            <h2 className="mid">Student List</h2>
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

            {/* Student Table */}
            <div className="table">
              <div className="table-container">
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>PRN</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Internship Type</th>
                      <th>Stipend</th>
                      <th>Company Name</th>
                      <th>Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length > 0 ? (
                      students.map((student) => (
                        <tr key={student.PRN}>
                          <td>{student.PRN}</td>
                          <td>{student.Name}</td>
                          <td className="email-cell">{student.email}</td>
                          <td>{student.phone}</td>
                          <td>{student.category}</td>
                          <td>{student.stipend || "N/A"}</td>
                          <td>{student.company_name}</td>
                          <td>{student.dept_id}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">No students found for the selected criteria.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Graph Filters */}
            <h2 className="mid">Graphs</h2>
            <div className="filters">
              <div className="filters-1">
                <label className="label">Department:</label>
                <select
                  className="select"
                  value={graphDeptFilter}
                  onChange={(e) => setGraphDeptFilter(e.target.value)}
                >
                  <option value="">Select Department</option>
                  <option value="CSE">CSE</option>
                  <option value="CSBS">CSBS</option>
                  <option value="CSF">CSF</option>
                  <option value="AIDS">AIDS</option>
                </select>
              </div>

              <div className="filters-1">
                <label className="label">Internship Type:</label>
                <select
                  className="select"
                  value={graphTypeFilter}
                  onChange={(e) => setGraphTypeFilter(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="on">On-Campus</option>
                  <option value="off">Off-Campus</option>
                </select>
              </div>
            </div>
            {/* Render Graph */}
            {graphDeptFilter && graphTypeFilter && (
              <div style={{ marginTop: "30px" }}>
                <StudentDetailSummaryChart data={StudentGraphData} />
              </div>
              )}
          </section>
        )}
      </main>
    </div>
  );
};

export default StudentDetails;