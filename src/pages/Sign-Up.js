import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
    gender: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    medicalHistory: [
      {
        condition: "",
        treatment: "",
        doctor: "",
      },
    ],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handling nested object for address
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1]; // Get the field name (street, city, state, zipCode)
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    }
    // Handling medical history fields
    else if (
      name === "condition" ||
      name === "treatment" ||
      name === "doctor"
    ) {
      const index = e.target.dataset.index;
      const newMedicalHistory = [...formData.medicalHistory];
      newMedicalHistory[index] = {
        ...newMedicalHistory[index],
        [name]: value,
      };
      setFormData({ ...formData, medicalHistory: newMedicalHistory });
    }
    // Handling other fields
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addMedicalHistory = () => {
    setFormData({
      ...formData,
      medicalHistory: [
        ...formData.medicalHistory,
        { condition: "", treatment: "", doctor: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseData = await signup(formData);
    if (!responseData.patient.profileComplete) {
      navigate("/complete-profile");
    } else {
      navigate("/hospital-list");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        {/* Basic Fields */}
        <TextField
          onChange={handleChange}
          label="First Name"
          name="firstName"
          required
        />
        <TextField
          onChange={handleChange}
          label="Last Name"
          name="lastName"
          required
        />
        <TextField
          onChange={handleChange}
          label="Email"
          name="email"
          required
        />
        <TextField
          onChange={handleChange}
          label="Password"
          name="password"
          type="password"
          required
        />
        <TextField onChange={handleChange} name="dob" type="date" required />
        <TextField
          onChange={handleChange}
          label="Phone"
          name="phone"
          required
        />
        <TextField
          onChange={handleChange}
          label="Gender"
          name="gender"
          required
        />

        {/* Address Fields */}
        <Typography variant="h6">Address</Typography>
        <TextField
          onChange={handleChange}
          label="Street"
          name="address.street"
          required
        />
        <TextField
          onChange={handleChange}
          label="City"
          name="address.city"
          required
        />
        <TextField
          onChange={handleChange}
          label="State"
          name="address.state"
          required
        />
        <TextField
          onChange={handleChange}
          label="Zip Code"
          name="address.zipCode"
          required
        />

        {/* Medical History Fields */}
        <Typography variant="h6">Medical History</Typography>
        {formData.medicalHistory.map((entry, index) => (
          <div key={index}>
            <TextField
              onChange={handleChange}
              label="Condition"
              name="condition"
              data-index={index}
              required
            />
            <TextField
              onChange={handleChange}
              label="Treatment"
              name="treatment"
              data-index={index}
            />
            <TextField
              onChange={handleChange}
              label="Doctor"
              name="doctor"
              data-index={index}
            />
          </div>
        ))}
        <Button type="button" onClick={addMedicalHistory}>
          Add More Medical History
        </Button>

        <Button type="submit">Sign Up</Button>
      </form>
    </Container>
  );
};

export default Signup;
