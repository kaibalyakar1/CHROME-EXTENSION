import axios from "axios";

// Ensure this points to the correct backend server and endpoint.
const API_URL = "http://localhost:5000/api/users"; // Adjust as necessary

export const signupUser = async (userData) => {
  return await axios.post(`${API_URL}/signup`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/login`, credentials);
};

export const submitDetails = async (userId, userData) => {
  const response = await axios.post(`${API_URL}/${userId}/details`, userData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Include your token here
    },
  });
  return response;
};

export const getUserDetails = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}/details`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Include your token here
    },
  });
  return response;
};

export const adminGetAllUsers = async (adminCredentials) => {
  return await axios.post(`${API_URL}/admin`, adminCredentials);
};
