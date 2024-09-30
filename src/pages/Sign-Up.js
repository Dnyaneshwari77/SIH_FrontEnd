import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else if (
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
    } else {
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

    toast.success("You register successfully!");
    if (!responseData.patient.profileComplete) {
      navigate("/complete-profile");
    } else {
      navigate("/hospital-list");
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Basic Fields */}
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                label="First Name"
                name="firstName"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                label="Last Name"
                name="lastName"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                label="Email"
                name="email"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                label="Password"
                name="password"
                type="password"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                name="dob"
                type="date"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                label="Phone"
                name="phone"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                label="Gender"
                name="gender"
                fullWidth
                required
              />
            </Grid>

            {/* Address Fields */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Address
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                label="Street"
                name="address.street"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                label="City"
                name="address.city"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                label="State"
                name="address.state"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                label="Zip Code"
                name="address.zipCode"
                fullWidth
                required
              />
            </Grid>

            {/* Medical History Fields */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Medical History
              </Typography>
            </Grid>
            {formData.medicalHistory.map((entry, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    onChange={handleChange}
                    label="Condition"
                    name="condition"
                    data-index={index}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    onChange={handleChange}
                    label="Treatment"
                    name="treatment"
                    data-index={index}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    onChange={handleChange}
                    label="Doctor"
                    name="doctor"
                    data-index={index}
                    fullWidth
                  />
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                type="button"
                variant="outlined"
                onClick={addMedicalHistory}
              >
                Add More Medical History
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
