const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String }, // Full Name
    age: { type: Number }, // Age
    dob: { type: Date }, // Date of Birth
    email: { type: String, unique: true }, // Email
    fatherName: { type: String }, // Father's Name
    motherName: { type: String }, // Mother's Name
    address: { type: String }, // Address
    city: { type: String }, // City
    state: { type: String }, // State
    country: { type: String }, // Country
    pincode: { type: String }, // Pincode
    mobileNumber: { type: String }, // Mobile Number
    secondaryMobileNumber: { type: String }, // Secondary Mobile Number
    experienceYears: { type: Number }, // Years of Experience
    currentJobTitle: { type: String }, // Current Job Title
    previousJobTitles: [{ type: String }], // Previous Job Titles
    companyName: { type: String }, // Last Company Name
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
    }, // Marital Status
    qualifications: [
      {
        // Array of qualifications
        degree: { type: String }, // Degree
        institution: { type: String }, // Institution Name
        yearOfPassing: { type: Number }, // Year of Passing
      },
    ],
    skills: [{ type: String }], // Array of skills
    certifications: [
      {
        // Array of certifications
        title: { type: String }, // Certification Title
        issuedBy: { type: String }, // Issuing Organization
        dateIssued: { type: Date }, // Date Issued
        expiryDate: { type: Date }, // Expiry Date (if applicable)
      },
    ],
    languages: [{ type: String }], // Array of languages spoken
    linkedinProfile: { type: String }, // LinkedIn Profile URL
    githubProfile: { type: String }, // GitHub Profile URL
    portfolio: { type: String }, // Portfolio URL
    website: { type: String }, // Personal Website URL
    hobbies: [{ type: String }], // Array of hobbies
    references: [
      {
        // Array of references
        name: { type: String }, // Reference Name
        relation: { type: String }, // Relation to the user
        contact: { type: String }, // Reference Contact Information
        email: { type: String }, // Reference Email
      },
    ],
    expectedSalary: { type: Number }, // Expected Salary
    noticePeriod: { type: String }, // Notice Period (in weeks)
    willingnessToRelocate: { type: Boolean, default: false }, // Willingness to Relocate
    availability: { type: String }, // Availability (e.g., Immediately, 2 weeks, etc.)
    previousCompanies: [
      {
        // Array of previous companies
        companyName: { type: String }, // Company Name
        jobTitle: { type: String }, // Job Title
        startDate: { type: Date }, // Start Date
        endDate: { type: Date }, // End Date (if currently employed, this can be left empty)
        responsibilities: [{ type: String }], // Responsibilities
      },
    ],
    password: { type: String }, // Password
  },
  {
    timestamps: true,
  }
);

// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to match entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
