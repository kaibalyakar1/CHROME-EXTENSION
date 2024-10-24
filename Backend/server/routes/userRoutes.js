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

router.post("/register", registerUser);
router.post("/login", loginUser);
router
  .route("/details")
  .post(protect, submitUserDetails)
  .get(protect, getUserDetails);
router.put("/edit", protect, editUser); // New route for editing user details

module.exports = router;

router.post("/register", registerUser);
router.post("/login", loginUser);
router
  .route("/details")
  .post(protect, submitUserDetails)
  .get(protect, getUserDetails);
router.put("/edit", protect, editUser); // New route for editing user details

module.exports = router;
