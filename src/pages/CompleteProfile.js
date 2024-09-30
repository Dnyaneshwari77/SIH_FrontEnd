import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  LinearProgress,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CompleteProfile = () => {
  const { currentUser, updateProfile } = useAuth();


  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser == "No user") {
      navigate("/login");
    } else {
      if (currentUser.profileComplete == true) {
        navigate("/hospital-list");
      }
    }
  });
  // Initialize form state
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    allergies: [],
    currentMedications: [],
    healthInfo: "",
    documents: [{ documentType: "", documentUrl: "" }],
  });

  // Calculate profile completion percentage based on filled fields
  const calculateCompletionPercentage = () => {
    const totalFields = 6 + formData.documents.length * 2; // 6 fields for personal info + 2 for each document
    const filledFields = Object.values(formData).reduce((acc, value) => {
      if (typeof value === "string") {
        return acc + (value ? 1 : 0);
      }
      if (Array.isArray(value)) {
        return acc + value.length; // Count filled array fields
      }
      return acc;
    }, 0);
    return Math.round((filledFields / totalFields) * 100);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handling documents array
    if (name.startsWith("documents.")) {
      const index = parseInt(name.split(".")[1]); // Get the index of the document
      const field = name.split(".")[2]; // Get the field name (documentType)
      const updatedDocuments = [...formData.documents];
      updatedDocuments[index] = {
        ...updatedDocuments[index],
        [field]: value,
      };
      setFormData((prev) => ({
        ...prev,
        documents: updatedDocuments,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addAllergy = () => {
    setFormData((prev) => ({
      ...prev,
      allergies: [...prev.allergies, ""],
    }));
  };

  const handleAllergyChange = (index, value) => {
    const updatedAllergies = [...formData.allergies];
    updatedAllergies[index] = value;
    setFormData((prev) => ({
      ...prev,
      allergies: updatedAllergies,
    }));
  };

  const addMedication = () => {
    setFormData((prev) => ({
      ...prev,
      currentMedications: [...prev.currentMedications, ""],
    }));
  };

  const handleMedicationChange = (index, value) => {
    const updatedMedications = [...formData.currentMedications];
    updatedMedications[index] = value;
    setFormData((prev) => ({
      ...prev,
      currentMedications: updatedMedications,
    }));
  };

  const addDocument = () => {
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, { documentType: "", documentUrl: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form data to be sent
    const profileData = {
      ...formData,
    };

    try {
      await updateProfile(currentUser.id, { ...currentUser, ...profileData });
      navigate("/hospital-list"); // Navigate to a success page or the next step
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      profileCompletionPercentage: calculateCompletionPercentage(),
    }));
  }, [formData]);

  return (
    <Container>
      <Typography variant="h4">Complete Your Profile</Typography>
      <LinearProgress
        variant="determinate"
        value={calculateCompletionPercentage()}
      />
      <form onSubmit={handleSubmit}>
        {/* Personal Info Fields */}
        <Typography variant="h6">Personal Info</Typography>
        <TextField
          onChange={handleChange}
          label="Height"
          name="height"
          fullWidth
          margin="normal"
        />
        <TextField
          onChange={handleChange}
          label="Weight"
          name="weight"
          fullWidth
          margin="normal"
        />
        <Typography variant="h6">Allergies</Typography>
        {formData.allergies.map((allergy, index) => (
          <Box key={index} display="flex" alignItems="center">
            <TextField
              onChange={(e) => handleAllergyChange(index, e.target.value)}
              value={allergy}
              label={`Allergy ${index + 1}`}
              fullWidth
              margin="normal"
            />
          </Box>
        ))}
        <Button onClick={addAllergy} type="button">
          Add Allergy
        </Button>

        <Typography variant="h6">Current Medications</Typography>
        {formData.currentMedications.map((medication, index) => (
          <Box key={index} display="flex" alignItems="center">
            <TextField
              onChange={(e) => handleMedicationChange(index, e.target.value)}
              value={medication}
              label={`Medication ${index + 1}`}
              fullWidth
              margin="normal"
            />
          </Box>
        ))}
        <Button onClick={addMedication} type="button">
          Add Medication
        </Button>

        <TextField
          onChange={handleChange}
          label="Health Info"
          name="healthInfo"
          fullWidth
          margin="normal"
        />

        {/* Document URL Fields */}
        <Typography variant="h6">Document URLs</Typography>
        {formData.documents.map((doc, index) => (
          <Box key={index} display="flex" flexDirection="column">
            <TextField
              onChange={handleChange}
              label="Document Type"
              name={`documents.${index}.documentType`}
              fullWidth
              margin="normal"
            />
            <TextField
              onChange={handleChange}
              label="Document URL"
              name={`documents.${index}.documentUrl`}
              fullWidth
              margin="normal"
            />
          </Box>
        ))}
        <Button type="button" onClick={addDocument}>
          Add More Document
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default CompleteProfile;
