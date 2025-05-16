import { DateTimePicker, LocalizationProvider, MobileDateTimePicker } from '@mui/lab';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import swal from 'sweetalert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useAuth from '../../../Hooks/useAuth';

const Appointment = () => {
    const { user } = useAuth();

    const [clearedDate, setClearedDate] = React.useState(null);
    const [value, setValue] = React.useState(new Date());

    // doctor name function
    const [docName, setDocName] = React.useState('');

    const handleChange = (event) => {
        setDocName(event.target.value);
    };

    // Swal alert
    const swalAlert = () => {
        return swal("Your Appointment is Done. You will receive a mail ASAP.", {
            button: false,
            icon: "success"
        });
    };

    return (
        <Box 
    id='appointment'
    sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundImage: `url('https://img.freepik.com/free-photo/make-appointment-see-doctor-online-diagnosis-treatmentfamily-health-care_537132-1364.jpg?w=996')`, // Direct image link
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: 4
    }}
>

            <Container maxWidth="xl" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 3, p: 4 }}>
                <Typography variant='h6' sx={{ mt: 3, mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                    Select Your Time and Date for Appointment
                </Typography>

                {/* Doctor Selection */}
                <FormControl sx={{ mb: 3, minWidth: '100%' }}>
                    <InputLabel>Select Doctor Name</InputLabel>
                    <Select
                        value={docName}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value={10}>Dr. Krishna</MenuItem>
                        <MenuItem value={11}>Dr. Rajalakshmi G</MenuItem>
                        <MenuItem value={12}>Dr. Lakshmi Madhavan</MenuItem>
                        <MenuItem value={13}>Dr. Menaga Pandian</MenuItem>
                        <MenuItem value={14}>Dr. Rosemary</MenuItem>
                        <MenuItem value={16}>Dr. C. S. I. Jayaraj Annapackiam</MenuItem>
                        <MenuItem value={17}>Dr. V. Sundari</MenuItem>
                        <MenuItem value={18}>Dr. Aruna Devi</MenuItem>
                        <MenuItem value={19}>Dr. Anne Prewina Gurushekar</MenuItem>
                    </Select>
                </FormControl>

                {/* User Name and Email */}
                <TextField sx={{ mb: 2 }} value={user.displayName} fullWidth label="Your Name" />
                <TextField sx={{ mb: 2 }} value={user.email} fullWidth label="Your Email" />

                {/* Date Picker */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                        <MobileDateTimePicker
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                            label="Appointment Date"
                            minDate={new Date()}
                            inputFormat="yyyy/MM/dd hh:mm a"
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>

                {/* Problem Type */}
                <TextField sx={{ mt: 2, mb: 2 }} fullWidth label="Problem Type" />

                {/* Confirm Button */}
                <Button 
                    sx={{ 
                        p: 1, 
                        mt: 2, 
                        mb: 3, 
                        backgroundColor: '#0d47a1',
                        '&:hover': { backgroundColor: '#1976d2' } 
                    }} 
                    onClick={swalAlert} 
                    fullWidth
                    variant="contained"
                >
                    <AddCircleIcon sx={{ mr: 1 }} /> Confirm
                </Button>
            </Container>
        </Box>
    );
};

export default Appointment;
