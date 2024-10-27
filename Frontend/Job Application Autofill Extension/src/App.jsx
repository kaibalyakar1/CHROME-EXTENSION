import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserSignup from "./Components/UserSignup";
import UserLogin from "./Components/UserLogin";
import UserDetails from "./Components/UserDetails";
import AdminDashboard from "./Components/AdminDashboard";
import HomePage from "./api/Pages/HomePage";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/details/:userId" element={<UserDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
