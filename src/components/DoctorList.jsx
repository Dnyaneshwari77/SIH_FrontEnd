import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { doctors } from "../data/doctor";

const DoctorList = ({ hospitalId, onBook }) => {
  const filteredDoctors = doctors.filter(
    (doctor) => doctor.hospitalId === hospitalId
  );

  return (
    <div>
      {filteredDoctors.map((doctor) => (
        <Card key={doctor.id} style={{ margin: "10px 0" }}>
          <CardContent>
            <Typography variant="h6">{doctor.name}</Typography>
            <Typography variant="body2">
              Specialty: {doctor.specialty}
            </Typography>
            <Typography variant="body2">
              Availability: {doctor.availability.join(", ")}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onBook(doctor)}
            >
              Book Appointment
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DoctorList;
