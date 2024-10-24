const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./server/routes/userRoutes");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // To parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes
app.use("/api/users", userRoutes);

// MongoDB connection
const connectDB = require("./server/config/db");
connectDB();

// Define PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
