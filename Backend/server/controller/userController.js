const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Registration
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Submit Additional User Details
const submitUserDetails = async (req, res) => {
  const userId = req.user.id; // Get user ID from JWT token
  const {
    age,
    dob,
    fatherName,
    motherName,
    address,
    city,
    state,
    country,
    pincode,
    mobileNumber,
    secondaryMobileNumber,
    experienceYears,
    currentJobTitle,
    previousJobTitles,
    companyName,
    maritalStatus,
    qualifications,
    skills,
    certifications,
    languages,
    linkedinProfile,
    githubProfile,
    portfolio,
    website,
    hobbies,
    references,
    expectedSalary,
    noticePeriod,
    willingnessToRelocate,
    availability,
    previousCompanies,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        age,
        dob,
        fatherName,
        motherName,
        address,
        city,
        state,
        country,
        pincode,
        mobileNumber,
        secondaryMobileNumber,
        experienceYears,
        currentJobTitle,
        previousJobTitles,
        companyName,
        maritalStatus,
        qualifications,
        skills,
        certifications,
        languages,
        linkedinProfile,
        githubProfile,
        portfolio,
        website,
        hobbies,
        references,
        expectedSalary,
        noticePeriod,
        willingnessToRelocate,
        availability,
        previousCompanies,
      },
      { new: true }
    );

    res.status(200).json({
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user details", error: error.message });
  }
};

// Edit User Details
const editUser = async (req, res) => {
  const userId = req.user.id; // Get user ID from JWT token
  const updates = req.body; // Get updates from the request body

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// Get User Details
const getUserDetails = async (req, res) => {
  const userId = req.user.id; // Get user ID from JWT token

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        dob: user.dob,
        fatherName: user.fatherName,
        motherName: user.motherName,
        address: user.address,
        city: user.city,
        state: user.state,
        country: user.country,
        pincode: user.pincode,
        mobileNumber: user.mobileNumber,
        secondaryMobileNumber: user.secondaryMobileNumber,
        experienceYears: user.experienceYears,
        currentJobTitle: user.currentJobTitle,
        previousJobTitles: user.previousJobTitles,
        companyName: user.companyName,
        maritalStatus: user.maritalStatus,
        qualifications: user.qualifications,
        skills: user.skills,
        certifications: user.certifications,
        languages: user.languages,
        linkedinProfile: user.linkedinProfile,
        githubProfile: user.githubProfile,
        portfolio: user.portfolio,
        website: user.website,
        hobbies: user.hobbies,
        references: user.references,
        expectedSalary: user.expectedSalary,
        noticePeriod: user.noticePeriod,
        willingnessToRelocate: user.willingnessToRelocate,
        availability: user.availability,
        previousCompanies: user.previousCompanies,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user details", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  submitUserDetails,
  editUser,
  getUserDetails,
};
