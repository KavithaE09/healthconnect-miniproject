import React, { useState } from "react";
import HospitalCard from "./HospitalCard.js";
import AppointmentForm from "./AppointmentForm.js";
import { Container, Typography, Grid } from "@mui/material";
import hospitals from "../data/hospitalsData.json"; 

const NearbyHospitals = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>
        🏥 Nearby Hospitals
      </Typography>

      {/* Grid container to hold Hospital Cards */}
      <Grid container spacing={3}>
        {hospitals.map((hospital) => (
          <Grid item xs={12} sm={6} md={4} key={hospital.id}>
            <HospitalCard
              hospital={hospital}
              onBookAppointment={setSelectedHospital}
            />
          </Grid>
        ))}
      </Grid>

      {/* Appointment Form */}
      <AppointmentForm
        open={!!selectedHospital}
        handleClose={() => setSelectedHospital(null)}
        hospital={selectedHospital}
      />
    </Container>
  );
};

export default NearbyHospitals;
