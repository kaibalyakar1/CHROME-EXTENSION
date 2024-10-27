const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  submitUserDetails,
  editUser,
  getUserDetails,
} = require("../controller/userController.js");
const { protect } = require("../middleware/auth.js");

// User Registration
router.post("/register", registerUser);

// User Login
router.post("/login", loginUser);

// Submit User Details (specific to a user)
router
  .route("/:id/details") // Include user ID in the route
  .post(protect, submitUserDetails)
  .get(protect, getUserDetails);

// Edit User Details (specific to a user)
router.put("/:id/edit", protect, editUser); // Include user ID in the route

module.exports = router;
