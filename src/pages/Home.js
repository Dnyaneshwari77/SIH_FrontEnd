import React from "react";
import { Typography, Box, Button, Grid, Container } from "@mui/material";
import patient_image from "../assets/hero_image.png";
import HealthCareSections from "../components/HealthCareSections";
import { FoodBank } from "@mui/icons-material";
import Footer from "../components/Footer";
import OurServices from "../components/OurServices";

function Home() {
  return (
    <>
      <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        {/* Hero Section */}
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
            color: "white",
            textAlign: "center",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Hero Text */}
            <Grid item xs={12} md={6}>
              <Typography variant="h2" color="primary" gutterBottom>
                Welcome to Your Health, Empowered!
              </Typography>
              <Typography variant="body1" gutterBottom>
                Your health, our priority. Access your records, schedule
                appointments, and much more.
              </Typography>
              <Typography variant="h6">
              Discover a convenient way to take charge of your health with our user-friendly patient portal. Access your medical records, schedule appointments, communicate with your healthcare team, and manage prescriptions—all in one secure place. Whether you're checking lab results or requesting a prescription refill, we are here to make your healthcare journey easier and more efficient. Join us today and experience personalized care at your fingertips!
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Get Started
              </Button>
            </Grid>

            {/* Hero Image */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={patient_image}
                alt="Portal Illustration"
                sx={{ width: "100%", borderRadius: "10px" }}
              />
            </Grid>
          </Grid>
        </Container>

        {/* Services Section */}
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            py: 6,
            textAlign: "center",
          }}
        >
          <OurServices />
        </Box>
      </Box>
      <HealthCareSections />
      <Footer />
    </>
  );
}

export default Home;
