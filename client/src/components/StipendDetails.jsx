import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMoneyBillAlt, FaArrowDown, FaChartBar } from "react-icons/fa";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import StipendBarChart from "./StipendBarChart";
import StipendTimeSeriesChart from "./StipendTimeSeriesChart"; 
import "./Home.css";

const StipendDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [studentData, setStipendData] = useState({
    highest_stipend: 0,
    lowest_stipend: 0,
    avg_stipend: 0,
  });

  const [filteredStipendData, setFilteredStipendData] = useState([]);
  const [yearWiseStipendData, setYearWiseStipendData] = useState([]);
  const [viewMode, setViewMode] = useState("graph");

  const [filterType, setFilterType] = useState("department");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const departmentOptions = ["CSE", "CSBS", "CSF", "AIDS"];
  const yearOptions = ["2023", "2024"];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
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
    const fetchFilteredDashboardData = async () => {
      if (filterType === "department" && selectedYear) {
        try {
          const response = await axios.get("http://localhost:5000/api/stipend/department-summary", {
            params: { year: selectedYear },
          });
          setFilteredStipendData(response.data);
        } catch (error) {
          console.error("Error fetching filtered stipend details:", error);
        }
      }
    };
    fetchFilteredDashboardData();
  }, [filterType, selectedYear]);

  useEffect(() => {
    const fetchYearWiseSummary = async () => {
      if (filterType === "year" && selectedDepartment) {
        try {
          const response = await axios.get("http://localhost:5000/api/stipend/year-summary", {
            params: { department: selectedDepartment },
          });
          setYearWiseStipendData(response.data);
          console.log("Year-wise data:", response.data);
        } catch (error) {
          console.error("Error fetching year-wise stipend summary:", error);
        }
      }
    };
    fetchYearWiseSummary();
  }, [filterType, selectedDepartment]);

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

            {/* Filter Section */}
            <div className="filters">
              <div className="filters-1">
                <label className="label">Filter By:</label>
                <select
                  className="select"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="">Select Filter Type</option>
                  <option value="department">Department Wise</option>
                  <option value="year">Year Wise</option>
                </select>
              </div>

              {filterType === "department" && (
                <div className="filters-1">
                  <label className="label">Select Year:</label>
                  <select
                    className="select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="">Select Year</option>
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {filterType === "year" && (
                <div className="filters-1">
                  <label className="label">Select Department:</label>
                  <select
                    className="select"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="">Select Department</option>
                    {departmentOptions.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              )}
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

            {/* Data Display */}
            {viewMode === "graph" ? (
              filterType === "department" ? (
                <StipendBarChart data={filteredStipendData} />
              ) : (
                <StipendTimeSeriesChart data={yearWiseStipendData} />
              )
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
                      <td>
                        {filteredStipendData?.highest_stipend ??
                          yearWiseStipendData?.highest_stipend ??
                          "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td>Average Stipend</td>
                      <td>
                        {filteredStipendData?.avg_stipend ??
                          yearWiseStipendData?.avg_stipend ??
                          "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td>Lowest Stipend</td>
                      <td>
                        {filteredStipendData?.lowest_stipend ??
                          yearWiseStipendData?.lowest_stipend ??
                          "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default StipendDetails;
