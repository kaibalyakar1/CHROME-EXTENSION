import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserDetails, submitDetails } from "../api/api";

const UserDetails = () => {
  const { userId } = useParams(); // Retrieve userId from URL parameters
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    dob: "",
    email: "",
    fatherName: "",
    motherName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    mobileNumber: "",
    secondaryMobileNumber: "",
    experienceYears: "",
    currentJobTitle: "",
    previousJobTitles: [""],
    companyName: "",
    maritalStatus: "",
    qualifications: [{ degree: "", institution: "", yearOfPassing: "" }],
    skills: [""],
    certifications: [
      { title: "", issuedBy: "", dateIssued: "", expiryDate: "" },
    ],
    languages: [""],
    linkedinProfile: "",
    githubProfile: "",
    portfolio: "",
    website: "",
    hobbies: [""],
    references: [{ name: "", relation: "", contact: "", email: "" }],
    expectedSalary: "",
    noticePeriod: "",
    willingnessToRelocate: false,
    availability: "",
    previousCompanies: [
      {
        companyName: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        responsibilities: [""],
      },
    ],
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        try {
          const response = await getUserDetails(userId);
          setUserData(response.data);
        } catch (error) {
          setErrorMessage("Error fetching user details. Please try again.");
        }
      } else {
        setErrorMessage("No user ID provided.");
      }
    };
    fetchUserDetails();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitDetails(userId, userData);
      setSuccessMessage("Your details have been submitted successfully!");
      setErrorMessage(""); // Clear error message on successful submit
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      setErrorMessage("Error submitting details. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Details</h2>
      <input
        name="name"
        value={userData.name}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />
      <input
        name="age"
        value={userData.age}
        onChange={handleChange}
        placeholder="Age"
        required
      />
      <input
        name="dob"
        value={userData.dob}
        onChange={handleChange}
        placeholder="Date of Birth"
        type="date"
        required
      />
      <input
        name="email"
        value={userData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="fatherName"
        value={userData.fatherName}
        onChange={handleChange}
        placeholder="Father's Name"
      />
      <input
        name="motherName"
        value={userData.motherName}
        onChange={handleChange}
        placeholder="Mother's Name"
      />
      <input
        name="address"
        value={userData.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
      <input
        name="city"
        value={userData.city}
        onChange={handleChange}
        placeholder="City"
        required
      />
      <input
        name="state"
        value={userData.state}
        onChange={handleChange}
        placeholder="State"
        required
      />
      <input
        name="country"
        value={userData.country}
        onChange={handleChange}
        placeholder="Country"
        required
      />
      <input
        name="pincode"
        value={userData.pincode}
        onChange={handleChange}
        placeholder="Pincode"
        required
      />
      <input
        name="mobileNumber"
        value={userData.mobileNumber}
        onChange={handleChange}
        placeholder="Mobile Number"
        required
      />
      <input
        name="secondaryMobileNumber"
        value={userData.secondaryMobileNumber}
        onChange={handleChange}
        placeholder="Secondary Mobile Number"
      />
      <input
        name="experienceYears"
        value={userData.experienceYears}
        onChange={handleChange}
        placeholder="Years of Experience"
      />
      <input
        name="currentJobTitle"
        value={userData.currentJobTitle}
        onChange={handleChange}
        placeholder="Current Job Title"
      />
      <input
        name="companyName"
        value={userData.companyName}
        onChange={handleChange}
        placeholder="Last Company Name"
      />
      <select
        name="maritalStatus"
        value={userData.maritalStatus}
        onChange={handleChange}
      >
        <option value="">Select Marital Status</option>
        <option value="Single">Single</option>
        <option value="Married">Married</option>
        <option value="Divorced">Divorced</option>
        <option value="Widowed">Widowed</option>
      </select>
      <input
        name="linkedinProfile"
        value={userData.linkedinProfile}
        onChange={handleChange}
        placeholder="LinkedIn Profile"
      />
      <input
        name="githubProfile"
        value={userData.githubProfile}
        onChange={handleChange}
        placeholder="GitHub Profile"
      />
      <input
        name="portfolio"
        value={userData.portfolio}
        onChange={handleChange}
        placeholder="Portfolio URL"
      />
      <input
        name="website"
        value={userData.website}
        onChange={handleChange}
        placeholder="Website"
      />
      <input
        name="expectedSalary"
        value={userData.expectedSalary}
        onChange={handleChange}
        placeholder="Expected Salary"
      />
      <input
        name="noticePeriod"
        value={userData.noticePeriod}
        onChange={handleChange}
        placeholder="Notice Period"
      />
      <label>
        Willingness to Relocate:
        <input
          type="checkbox"
          name="willingnessToRelocate"
          checked={userData.willingnessToRelocate}
          onChange={handleChange}
        />
      </label>
      <input
        name="availability"
        value={userData.availability}
        onChange={handleChange}
        placeholder="Availability"
      />
      <button type="submit">Submit Details</button>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

export default UserDetails;
