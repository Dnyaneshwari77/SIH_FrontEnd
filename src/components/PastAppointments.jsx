import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { getAppointmentsFromStorage } from "../utils/localStorageUtile";

const PastAppointments = () => {
  const appointments = getAppointmentsFromStorage();

  return (
    <div>
      <Typography variant="h6">Past Appointments</Typography>
      {appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <Card key={index} style={{ margin: "10px 0" }}>
            <CardContent>
              <Typography variant="h6">Doctor: {appointment.doctor}</Typography>
              <Typography variant="body2">
                Patient: {appointment.patientName}
              </Typography>
              <Typography variant="body2">Date: {appointment.date}</Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No past appointments found.</Typography>
      )}
    </div>
  );
};

export default PastAppointments;
