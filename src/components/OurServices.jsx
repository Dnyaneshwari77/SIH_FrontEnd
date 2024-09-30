import React from "react";
import { Container, Typography, Grid, Box, Avatar } from "@mui/material";

import time from "../assets/timeCalculation.png";
import onlineappointment from "../assets/schedule.png";
import goodDoctor from "../assets/good_doctor.png";

// Sample image URLs - Replace these with your actual image URLs
const serviceImages = [time, onlineappointment, goodDoctor];

const OurServices = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Our Services
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Example Service 1 */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 4,
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Schedule Appointments"
              src={serviceImages[0]}
              sx={{ width: 80, height: 80, mb: 2 }} // Adjust size as needed
            />
            <Typography variant="h6" color="primary" align="center">
              Schedule Appointments
            </Typography>
            <Typography variant="body2" align="center">
              Easily book appointments with your doctor through our portal.
            </Typography>
          </Box>
        </Grid>

        {/* Example Service 2 */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 4,
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="View Health Records"
              src={serviceImages[1]}
              sx={{ width: 80, minHeight: 80, mb: 2 }} // Adjust size as needed
            />
            <Typography variant="h6" color="primary" align="center">
              View Health Records
            </Typography>
            <Typography variant="body2" align="center">
              Access your medical history and lab results anytime.
            </Typography>
          </Box>
        </Grid>

        {/* Example Service 3 */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 4,
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Manage Prescriptions"
              src={serviceImages[2]}
              sx={{ width: 80, height: 80, mb: 2 }} // Adjust size as needed
            />
            <Typography variant="h6" color="primary" align="center">
              Manage Prescriptions
            </Typography>
            <Typography variant="body2" align="center">
            Compassionate Care from Our Dedicated Team of Experts
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OurServices;
