import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import StudentDetails from "./components/StudentDetails";
import StipendDetails from "./components/StipendDetails";
import SchoolSupervisorTable from "./components/SchoolSupervisorTable";
import CompanySupervisors from "./components/company_supervisors"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/student-details" element={<StudentDetails />} />
        <Route path="/stipend-details" element={<StipendDetails />} />
        <Route path="/school-supervisor" element={<SchoolSupervisorTable />} />
        <Route path="/company-supervisors" element={<CompanySupervisors />} />
      </Routes>
    </Router>
  );
}

export default App;