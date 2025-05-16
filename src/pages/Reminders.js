import React, { useState, useEffect } from 'react';
import {
    Box, Button, Container, FormControl, InputLabel, MenuItem,
    Select, TextField, Typography, Snackbar, Alert, Modal
} from '@mui/material';
import axios from 'axios';

const Reminders = () => {
    const [reminders, setReminders] = useState([]);
    const [checkupType, setCheckupType] = useState('');
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState('');

    // 🔥 Modal States
    const [openModal, setOpenModal] = useState(false);
    const [modalMsg, setModalMsg] = useState('');

    // Load saved reminders
    useEffect(() => {
        const savedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
        setReminders(savedReminders);
    }, []);

    // Add a new reminder
    const handleAddReminder = () => {
        if (checkupType && date) {
            const newReminder = { id: Date.now(), checkupType, date, note, recurring: true };
            const updatedReminders = [...reminders, newReminder];
            setReminders(updatedReminders);
            localStorage.setItem('reminders', JSON.stringify(updatedReminders));
            setCheckupType('');
            setDate('');
            setNote('');
            setNotificationMsg('Reminder set successfully!');
            setOpenSnackbar(true);
        }
    };

    // Remove a reminder
    const handleRemoveReminder = (id) => {
        const updatedReminders = reminders.filter(reminder => reminder.id !== id);
        setReminders(updatedReminders);
        localStorage.setItem('reminders', JSON.stringify(updatedReminders));
        setNotificationMsg('Reminder removed.');
        setOpenSnackbar(true);
    };

    // 🔥 Check Reminders daily and Send SMS
    useEffect(() => {
        const checkReminders = () => {
            const today = new Date().toISOString().split('T')[0];
            reminders.forEach(reminder => {
                if (reminder.date === today) {
                    setModalMsg(`Reminder: ${reminder.checkupType} checkup today!`);
                    setOpenModal(true);

                    // Send SMS via Backend
                    axios.post('http://localhost:5000/send-sms', {
                        message: `Hey! Reminder for your ${reminder.checkupType} today!`,
                        to: '+91xxxxxxxxxx' // 🔥 Update this to the real user phone number
                    })
                    .then(res => console.log('SMS sent successfully:', res.data))
                    .catch(err => console.error('Error sending SMS:', err));
                }
            });
        };

        const interval = setInterval(checkReminders, 60000); // Check every minute
        checkReminders(); // Also check immediately on page load
        return () => clearInterval(interval);
    }, [reminders]);

    return (
        <Box
            sx={{
                backgroundImage: 'url("https://img.freepik.com/free-photo/young-male-psysician-with-patient-measuring-blood-pressure_1303-17879.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                py: 5
            }}
        >
            <Container maxWidth="sm" sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 2, p: 4 }}>
                <Typography variant="h4" gutterBottom textAlign="center">📅 Monthly Checkup Reminders</Typography>

                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Select Checkup Type</InputLabel>
                    <Select value={checkupType} onChange={(e) => setCheckupType(e.target.value)}>
                        <MenuItem value="Sugar Checkup">Sugar Checkup</MenuItem>
                        <MenuItem value="BP Checkup">Blood Pressure Checkup</MenuItem>
                        <MenuItem value="Pregnancy Checkup">Pregnancy Checkup</MenuItem>
                        <MenuItem value="Heart Checkup">Heart Checkup</MenuItem>
                        <MenuItem value="General Health">General Health</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    type="date"
                    label="Reminder Date"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mt: 2 }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <TextField
                    fullWidth
                    label="Note (Optional)"
                    multiline
                    rows={2}
                    sx={{ mt: 2 }}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />

                <Button
                    variant="contained"
                    sx={{ mt: 3, backgroundColor: '#4682B4', '&:hover': { backgroundColor: '#4169E1' } }}
                    onClick={handleAddReminder}
                >
                    Set Reminder
                </Button>

                {/* Upcoming Reminders */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5">Upcoming Reminders</Typography>
                    {reminders.length === 0 ? (
                        <Typography color="textSecondary" sx={{ mt: 2 }}>No reminders set.</Typography>
                    ) : (
                        reminders.map((reminder) => (
                            <Box
                                key={reminder.id}
                                sx={{
                                    p: 2,
                                    mt: 2,
                                    border: '1px solid #4682B4',
                                    borderRadius: '8px',
                                    transition: 'background-color 0.3s',
                                    '&:hover': { backgroundColor: '#ADD8E6' }
                                }}
                            >
                                <Typography><strong>Checkup:</strong> {reminder.checkupType}</Typography>
                                <Typography><strong>Date:</strong> {reminder.date}</Typography>
                                {reminder.note && (
                                    <Typography><strong>Note:</strong> {reminder.note}</Typography>
                                )}
                                <Button
                                    variant="contained"
                                    sx={{ mt: 1, backgroundColor: '#4682B4', '&:hover': { backgroundColor: '#4169E1' } }}
                                    onClick={() => handleRemoveReminder(reminder.id)}
                                >
                                    Remove
                                </Button>
                            </Box>
                        ))
                    )}
                </Box>

                {/* Snackbar for success/failure messages */}
                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                    <Alert severity="info">{notificationMsg}</Alert>
                </Snackbar>

                {/* Modal for today's reminder */}
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center'
                    }}>
                        <Typography variant="h6" gutterBottom>{modalMsg}</Typography>
                        <Button variant="contained" onClick={() => setOpenModal(false)}>
                            Close
                        </Button>
                    </Box>
                </Modal>

            </Container>
        </Box>
    );
};

export default Reminders;
