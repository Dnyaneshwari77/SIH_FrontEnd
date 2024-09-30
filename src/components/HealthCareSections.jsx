import React from "react";
import { Box, Grid, Typography, Button, Avatar } from "@mui/material";
import DoctorTeam from "../assets/doctorTeam.png";
import DoctorSmall from "../assets/doctor1.jpg";
import bedImage from "../assets/bed_allocation.png";
import medicineImage from "../assets/medicine.png";

const sections = [
  {
    title: "Medicine",
    content:
      "We provide medications through our partnered hospitals to ensure you receive the best treatment.",
    image: medicineImage,
  },
  {
    title: "Doctor",
    content: "Meet our team of the best doctors dedicated to your health.",
    image: DoctorTeam,
    isDoctorSection: true,
  },
  {
    title: "Bed Allocation",
    content:
      "Track the real-time availability of beds in our hospitals for seamless admission.",
    image: bedImage,
  },
];

const HealthCareSections = () => {
  return (
    <Box sx={{ padding: 4 }}>
      {sections.map((section, index) => (
        <Grid
          container
          spacing={4}
          key={index}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: 4 }}
        >
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={section.image}
                alt={section.title}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "8px",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              {section.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {section.content}
            </Typography>
            {section.isDoctorSection && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  alt="Doctor"
                  src={DoctorSmall}
                  sx={{ width: 100, height: 100, marginRight: 2 }}
                />
                <Typography variant="body2">
                  Our dedicated team includes highly experienced doctors in
                  various specialties.
                </Typography>
              </Box>
            )}
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Learn More
            </Button>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default HealthCareSections;
