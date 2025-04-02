import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserFriends, FaBuilding, FaBriefcase } from "react-icons/fa";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import "./Home.css";

const StudentDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(""); 
  const [semester, setSemester] = useState(""); 
  const [dept_id, setDeptId] = useState(""); // State for department
  const [studentData, setStudentData] = useState({
    total_students: 0,
    on_campus_students: 0,
    off_campus_students: 0,
  });
  const [students, setStudents] = useState([]); // Store student records

  useEffect(() => {
    const fetchStudentData = async () => {
      if (year) {  // Fetch data if year is selected
        setLoading(true);
        try {
          const response = await axios.get("http://localhost:5000/get_student_details", {
            params: { year, semester, dept_id } // Add dept_id to the query parameters
          });
          setStudentData(response.data.stats);
          setStudents(response.data.students);
        } catch (error) {
          console.error("Error fetching student details:", error);
        }
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [year, semester, dept_id]); // Re-fetch data when any filter changes

  return (
    <div className="dashboard-container">
      <Sidebar navigate={navigate} />
      <main className="content">
        <Navbar />
        <section className="overview">
          <h1>Student Details</h1>

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
        </section>

        {loading ? (
          <p>Loading Student Details...</p>
        ) : (
          <>
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

            {/* Student Table */}
            <div className="table">
              <h2>Student List</h2>
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
                    <th>Department</th> {/* Add Department Column */}
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map((student) => (
                      <tr key={student.PRN}>
                        <td>{student.PRN}</td>
                        <td>{`${student.First_name} ${student.Middle_name} ${student.Last_name}`}</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                        <td>{student.category}</td>
                        <td>{student.stipend || "N/A"}</td>
                        <td>{student.company_name}</td>
                        <td>{student.dept_id}</td> {/* Display Department */}
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
          </>
        )}
      </main>
    </div>
  );
};

export default StudentDetails;