import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TimesheetForm from "./components/TimesheetForm";
import EmployeeForm from "./components/EmployeeComponent";
import EmployeeList from "./components/EmploeeListComponent";
import WelcomeScreen from "./screens/WelcomeScreen";

const App = () => {
  return (
    <Router>
       <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/employees/new" element={<EmployeeForm />} />
        <Route path="/employees/:id" element={<EmployeeForm />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/timesheets/new" element={<TimesheetForm />} />
        <Route path="/timesheets/:id" element={<TimesheetForm />} />
      </Routes>
    </Router>
  );
};

export default App;
