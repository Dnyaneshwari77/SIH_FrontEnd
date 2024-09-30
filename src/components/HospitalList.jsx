import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  TextField,
} from "@mui/material";
import SearchBar from "./SearchBar";
import { hospitals } from "../data/hospitals";
import { doctors } from "../data/doctor";

import { jsPDF } from "jspdf";
import axios from "axios"; // Import axios for API calls
import QRCode from "qrcode";

const HospitalList = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [totalCharges, setTotalCharges] = useState(0);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    medicalHistory: "",
    email: "",
  });

  const qrRef = useRef(null);
  const [qrCodeReady, setQrCodeReady] = useState(false);

  useEffect(() => {
    if (qrRef.current) {
      setQrCodeReady(true); // Set to true when the QR code is available
    }
  }, [qrRef.current]);

  const filteredHospitals = selectedCity
    ? hospitals.filter((hospital) =>
        hospital.city.toLowerCase().includes(selectedCity.toLowerCase())
      )
    : hospitals;

  const handleCitySearch = (city) => {
    setSelectedCity(city);
  };

  const handleExploreSlots = (hospital) => {
    setSelectedHospital(hospital);
    setOpen(true);
  };

  const generateQrCode = async () => {
    try {
      // Convert the object to a string using JSON.stringify
      const qrData = JSON.stringify({
        selectedCity,
        selectedDoctor,
        selectedHospital,
        selectedSlot,
        transactionId,
        totalCharges,
        isPaymentComplete,
      });

      const response = await QRCode.toDataURL(qrData); // Pass the stringified data
      setImageUrl(response);
    } catch (error) {
      console.log("Error generating QR Code:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDoctor("");
    setSelectedSlot("");
    setIsPaymentComplete(false);
    setPatientDetails({
      name: "",
      age: "",
      gender: "",
      contact: "",
      medicalHistory: "",
      email: "",
    });
  };

  const handlePayment = () => {
    const fakeTransactionId = "TXN" + Math.floor(Math.random() * 100000);
    setTransactionId(fakeTransactionId);
    generateQrCode();
    setTimeout(() => {
      alert("Payment successful!");
      setIsPaymentComplete(true);
    }, 2000);

    sendEmail();
  };

  const sendEmail = async () => {
    const emailData = {
      email: patientDetails.email,
      name: patientDetails.name,
      hospital: selectedHospital.name,
      doctor: selectedDoctor,
      slot: selectedSlot,
      transactionId: transactionId,
      totalCharges: `$${totalCharges}`,
      qrCodeDataUrl: imageUrl,
    };

    try {
      const response = await axios.post(
        "https://sih-server-5ao9.onrender.com/api/send-appointment-email",
        emailData
      );
      alert("Email sent successfully!");
      console.log(response);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    }
  };

  const doctorsForHospital = selectedHospital
    ? doctors.filter((doc) => selectedHospital.doctors.includes(doc.id))
    : [];

  useEffect(() => {
    if (selectedDoctor) {
      const doctor = doctors.find((doc) => doc.id === selectedDoctor);
      if (doctor) {
        // Calculate total charges based on hospital and doctor fees
        const hospitalCharges = selectedHospital.charges || 0;
        const doctorCharges = doctor.fee || 0;
        setTotalCharges(hospitalCharges + doctorCharges);
      }
    } else {
      setTotalCharges(0); // Reset charges if no doctor is selected
    }
  }, [selectedDoctor, selectedHospital]);

  const downloadSlip = () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(12);
    doc.text("Appointment Confirmation", 20, 10);
    doc.text(`Patient Name: ${patientDetails.name}`, 20, 20); // Corrected
    doc.text(`Hospital: ${selectedHospital.name}`, 20, 30); // Corrected
    doc.text(`Doctor: ${selectedDoctor}`, 20, 40); // Corrected
    doc.text(`Slot: ${selectedSlot}`, 20, 50); // Corrected
    doc.text(`Transaction ID: ${transactionId}`, 20, 60); // Corrected
    doc.text(`Total Charges: $${totalCharges}`, 20, 70); // Corrected
    doc.text(`Contact: ${patientDetails.contact}`, 20, 80); // Corrected
    doc.text(`Gender: ${patientDetails.gender}`, 20, 90); // Corrected
    doc.text(`Age: ${patientDetails.age}`, 20, 100); // Corrected
    doc.text(`Medical History: ${patientDetails.medicalHistory}`, 20, 110); // Corrected
    doc.addImage(imageUrl, "PNG", 20, 120, 50, 50);

    // Access the QR Code canvas
    if (qrCodeReady && qrRef.current) {
      const qrCanvas = qrRef.current.canvas; // Access the canvas
      if (qrCanvas) {
        const qrDataUrl = qrCanvas.toDataURL("image/png");

        console.log(qrDataUrl);
        doc.addImage(qrDataUrl, "PNG", 20, 120, 50, 50); // Adjust dimensions as needed
      } else {
        console.error("QR code canvas is not ready.");
      }
    } else {
      console.error("QR code is not ready.");
    }

    // Save the PDF
    doc.save("appointment-slip.pdf");
  };

  const saveAppointmentToDB = async () => {
    const appointmentData = {
      patientName: patientDetails.name,
      age: patientDetails.age,
      gender: patientDetails.gender,
      contact: patientDetails.contact,
      email: patientDetails.email,
      medicalHistory: patientDetails.medicalHistory,
      city: selectedCity,
      hospitalName: selectedHospital.name,
      doctorName: selectedDoctor,
      appointmentSlot: selectedSlot,
      transactionId: transactionId,
      totalCharges: totalCharges,
      isPaymentComplete: isPaymentComplete,
      qrCodeImage: imageUrl,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments/save",
        appointmentData
      );
      console.log("Appointment saved:", response.data);
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  // Call this function after payment is completed and QR code is generated
  useEffect(() => {
    if (isPaymentComplete) {
      saveAppointmentToDB();
    }
  }, [isPaymentComplete]);

  return (
    <div>
      <SearchBar onSearch={handleCitySearch} />
      {filteredHospitals.map((hospital) => (
        <Card key={hospital.id} style={{ margin: "10px 0" }}>
          <CardContent>
            <Typography variant="h6">{hospital.name}</Typography>
            <Typography variant="body2">City: {hospital.city}</Typography>
            <Typography variant="body2">
              Specialties: {hospital.specialties.join(", ")}
            </Typography>
            <Typography variant="body2">
              Beds Available: {hospital.bedsAvailable}
            </Typography>

            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleExploreSlots(hospital)}
                >
                  Explore Appointment Slots
                </Button>
              </Grid>

              <Grid item>
                <Button variant="contained" color="secondary">
                  Emergency Call
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      {/* Appointment Popup Dialog */}
      {selectedHospital && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Book Appointment at {selectedHospital.name}</DialogTitle>
          <DialogContent>
            {/* Patient Name Input */}
            <TextField
              fullWidth
              label="Patient Name"
              value={patientDetails.name}
              onChange={(e) =>
                setPatientDetails({ ...patientDetails, name: e.target.value })
              }
              style={{ marginBottom: "20px" }}
            />
            <TextField
              fullWidth
              label="Patient Email"
              type="email"
              value={patientDetails.email}
              onChange={(e) =>
                setPatientDetails({ ...patientDetails, email: e.target.value })
              }
              style={{ marginBottom: "20px" }}
            />

            {/* Patient Age Input */}
            <TextField
              fullWidth
              label="Patient Age"
              value={patientDetails.age}
              onChange={(e) =>
                setPatientDetails({ ...patientDetails, age: e.target.value })
              }
              style={{ marginBottom: "20px" }}
            />

            {/* Patient Gender Input */}
            <FormControl fullWidth style={{ marginBottom: "20px" }}>
              <InputLabel>Gender</InputLabel>
              <Select
                value={patientDetails.gender}
                onChange={(e) =>
                  setPatientDetails({
                    ...patientDetails,
                    gender: e.target.value,
                  })
                }
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>

            {/* Patient Contact Number Input */}
            <TextField
              fullWidth
              label="Contact Number"
              value={patientDetails.contact}
              onChange={(e) =>
                setPatientDetails({
                  ...patientDetails,
                  contact: e.target.value,
                })
              }
              style={{ marginBottom: "20px" }}
            />

            {/* Medical History Input */}
            <TextField
              fullWidth
              label="Medical History/Notes"
              multiline
              rows={4}
              value={patientDetails.medicalHistory}
              onChange={(e) =>
                setPatientDetails({
                  ...patientDetails,
                  medicalHistory: e.target.value,
                })
              }
              style={{ marginBottom: "20px" }}
            />

            {/* Doctor Selection */}
            <FormControl fullWidth style={{ marginBottom: "20px" }}>
              <InputLabel>Doctor</InputLabel>
              <Select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                {doctorsForHospital.map((doc) => (
                  <MenuItem key={doc.id} value={doc.id}>
                    {doc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Appointment Slot Selection */}
            <FormControl fullWidth style={{ marginBottom: "20px" }}>
              <InputLabel>Appointment Slot</InputLabel>
              <Select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                {["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"].map(
                  (slot) => (
                    <MenuItem key={slot} value={slot}>
                      {slot}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={() => generateQrCode()}
            >
              Generate
            </Button>
            <br />
            <br />
            <br />
            {imageUrl ? (
              <a href={imageUrl} download>
                <img src={imageUrl} alt="img" />
              </a>
            ) : null}

            {/* Total Charges Display */}
            <Typography variant="h6">Total Charges: ${totalCharges}</Typography>
            {isPaymentComplete && (
              <Typography variant="body1" color="green">
                Payment successful! Transaction ID: {transactionId}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {!isPaymentComplete ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handlePayment}
              >
                Pay & Book Appointment
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={downloadSlip}
              >
                Download Appointment Slip
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default HospitalList;
