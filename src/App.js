import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // Import CSSTransition and TransitionGroup

// Components
import Header from "./components/Header";
import HospitalList from "./components/HospitalList"; // TODO convert this component to page
import Signup from "./pages/Sign-Up";
import Login from "./pages/Login"; // Make sure this is the correct import
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";

// Pages
import Home from "./pages/Home";
import CompleteProfile from "./pages/CompleteProfile";
import { Toaster } from "react-hot-toast";

// Context
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const location = useLocation(); // Get current location

  const handleHospitalSelect = (hospitalId) => {
    setSelectedHospital(hospitalId);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <AuthProvider>
      <Header />
      <Toaster />
      <Container>
        <TransitionGroup>
          <CSSTransition
            key={location.key} // Unique key for each route
            classNames="fade" // Class prefix for fade effect
            timeout={300} // Duration of the transition
          >
            <Routes location={location}>
              <Route index element={<Home />} />
              <Route path="hospital-list" element={<HospitalList />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="complete-profile" element={<CompleteProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Container>
    </AuthProvider>
  );
}

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouter;
