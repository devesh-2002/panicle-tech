// AppRouter.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import Footer from './components/Footer';

const App = () => {
  const [employees, setEmployees] = useState([]);

  const handleEmployeeCreated = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route
          path="/employee-details/:id"
          element={<EmployeeDetails />}
        />
        <Route
          path="/employee-form"
          element={<EmployeeForm onEmployeeCreated={handleEmployeeCreated} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
