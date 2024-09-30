import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

// Components
import Header from "./components/Header";
import HospitalList from "./components/HospitalList"; // TODO convert this component to page
import Signup from "./pages/Sign-Up";
import Login from "./pages/Login"; // Make sure this is the correct import
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";

// Pages
import Home from "./pages/Home";
import DoctorList from "./components/DoctorList";
import AppointmentForm from "./components/AppointmentForm";
import PastAppointments from "./components/PastAppointments";

// Context
import { AuthProvider } from "./context/AuthContext";
import CompleteProfile from "./pages/CompleteProfile";

function App() {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleHospitalSelect = (hospitalId) => {
    setSelectedHospital(hospitalId);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Header />
          <Container>
            <Routes>
              <Route index element={<Home />} />
              <Route path="hospital-list" element={<HospitalList />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />{" "}
              <Route path="complete-profile" element={<CompleteProfile />} />
              {/* Ensure Login is correctly imported */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
