import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Grid,
} from "@mui/material";

const HospitalCard = ({ hospital, onBookAppointment }) => {
  return (
    <Card
      sx={{
        mb: 3,
        boxShadow: 10,
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <CardMedia
        component="img"
        image={hospital.image}
        alt={hospital.name}
        sx={{
          width: "100%",
          height: 250,
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {hospital.name}
        </Typography>

        {/* TWO DETAILS IN A ROW */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography color="textSecondary">📍 {hospital.location}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="textSecondary">📞 {hospital.contact}</Typography>
          </Grid>
        </Grid>

        {/* If you want another pair, just copy the same pattern */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2">
              🔹 <strong>Specialties:</strong> {hospital.specialties.join(", ")}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              ⭐ <strong>Rating:</strong> {hospital.rating || "N/A"}
            </Typography>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            backgroundColor: "#2196F3",
            "&:hover": { backgroundColor: "#1976D2" },
          }}
          onClick={() => onBookAppointment(hospital)}
        >
          Book Appointment
        </Button>
      </CardContent>
    </Card>
  );
};

export default HospitalCard;
