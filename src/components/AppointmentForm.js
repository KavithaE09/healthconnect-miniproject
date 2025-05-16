import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    MenuItem,
    Button,
    Typography,
    Box
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const checkupTypes = [
    "Sugar Checkup",
    "BP Checkup",
    "Pregnancy",
    "General Health",
    "Heart Checkup"
];

const AppointmentForm = ({ open, handleClose, hospital }) => {
    const [selectedCheckup, setSelectedCheckup] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const [showSuccessPage, setShowSuccessPage] = useState(false);

    const handleSubmit = () => {
        if (!selectedCheckup || !date) {
            setError("Please fill all the fields.");
            return;
        }

        setShowSuccessPage(true);
    };

    const handleReset = () => {
        setSelectedCheckup("");
        setDate("");
        setError("");
        setShowSuccessPage(false);
        handleClose(); // Close the dialog or navigate if needed
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                {!showSuccessPage ? (
                    <>
                        <DialogTitle>Book Appointment at {hospital?.name}</DialogTitle>
                        <DialogContent>
                            <TextField
                                select
                                label="Select Checkup Type"
                                fullWidth
                                value={selectedCheckup}
                                onChange={(e) => setSelectedCheckup(e.target.value)}
                                sx={{ mt: 2 }}
                                error={!!error && !selectedCheckup}
                                helperText={!selectedCheckup && error}
                            >
                                {checkupTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                type="date"
                                label="Select Date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                sx={{ mt: 2 }}
                                error={!!error && !date}
                                helperText={!date && error}
                            />

                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleSubmit}
                                sx={{
                                    mt: 3,
                                    backgroundColor: '#4682B4',
                                    '&:hover': {
                                        backgroundColor: '#1E90FF'
                                    }
                                }}
                            >
                                Confirm Appointment
                            </Button>
                        </DialogContent>
                    </>
                ) : (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <CheckCircleIcon sx={{ fontSize: 70, color: 'green', mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            Thank you for booking at {hospital?.name}!
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            Your appointment for <strong>{selectedCheckup}</strong> on <strong>{date}</strong> has been successfully confirmed.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleReset}
                            sx={{
                                backgroundColor: '#4682B4',
                                '&:hover': {
                                    backgroundColor: '#1E90FF'
                                }
                            }}
                        >
                            Book Another Appointment
                        </Button>
                    </Box>
                )}
            </Dialog>
        </>
    );
};

export default AppointmentForm;
