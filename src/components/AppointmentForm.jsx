import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { saveAppointmentToStorage } from "../utils/localStorageUtile";

const AppointmentForm = ({ doctor }) => {
  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  const handleBook = () => {
    const newAppointment = {
      doctor: doctor.name,
      patientName,
      date: appointmentDate,
    };
    saveAppointmentToStorage(newAppointment);
    alert("Appointment booked successfully!");
  };

  return (
    <div>
      <Typography variant="h6">Booking with {doctor.name}</Typography>
      <TextField
        label="Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        fullWidth
        style={{ margin: "10px 0" }}
      />
      <TextField
        label="Appointment Date"
        value={appointmentDate}
        onChange={(e) => setAppointmentDate(e.target.value)}
        fullWidth
        style={{ margin: "10px 0" }}
      />
      <Button variant="contained" color="primary" onClick={handleBook}>
        Book Appointment
      </Button>
    </div>
  );
};

export default AppointmentForm;
