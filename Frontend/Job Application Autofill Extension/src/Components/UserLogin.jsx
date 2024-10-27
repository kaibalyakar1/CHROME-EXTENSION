import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { loginUser } from "../api/api";

const UserLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      console.log("API Response:", response.data); // Log the entire response for debugging

      const userId = response.data._id; // Use the correct property from the response

      if (userId) {
        alert("Login successful!");
        navigate(`/details/${userId}`); // Navigate to user details
      } else {
        alert("Login failed! User ID is missing.");
      }
      // After successful login
      localStorage.setItem("token", response.data.token); // Store the token received from the API
    } catch (error) {
      alert("Login failed! Please check your credentials.");
      console.error("Login Error: ", error); // Log error for debugging
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={credentials.email}
        onChange={handleChange}
        placeholder="Email"
        required // Add required attribute for form validation
      />
      <input
        name="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
        required // Add required attribute for form validation
      />
      <button type="submit">Log In</button>
    </form>
  );
};

export default UserLogin; // User login
