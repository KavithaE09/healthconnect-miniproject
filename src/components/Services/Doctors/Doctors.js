import React from 'react';
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, Container, Grid, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { HashLink } from 'react-router-hash-link';
import useDocData from '../../../Hooks/useDocData';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import swal from 'sweetalert';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';

const Doctors = () => {
    const doctors = useDocData();

    const swalAlert = () => {
        console.log('Appointment button clicked');
        
        swal({
            title: "Book an Appointment",
            content: createForm(),
            buttons: {
                cancel: "Cancel",
                confirm: "Submit"
            }
        }).then((confirm) => {
            if (confirm) {
                const name = document.getElementById('name').value;
                const age = document.getElementById('age').value;
                const gender = document.getElementById('gender').value;
                const phone = document.getElementById('phone').value;
                const problem = document.getElementById('problem').value;
                const date = document.getElementById('date').value;
                const time = document.getElementById('time').value;

                if (!name || !age || !gender || !phone || !problem || !date || !time) {
                    swal("Error", "Please fill in all fields!", "error");
                } else {
                    swal("Appointment Confirmed!", `Your details:\n\n➥ Name: ${name}\n➥ Age: ${age}\n➥ Gender: ${gender}\n➥ Phone: ${phone}\n➥ Problem: ${problem}\n➥ Date: ${date}\n➥ Time: ${time}\n\nYou will receive a confirmation email if the slot is available.`, "success");
                }
            }
        });
    };

    const createForm = () => {
        const formContainer = document.createElement('div');
        formContainer.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 15px; width: 100%; max-width: 400px; margin: auto; font-size: 15px;">
                
                <label style="font-weight: bold;">Name:</label>
                <input type="text" id="name" class="swal-input" placeholder="Enter your name" style="padding: 8px; font-size: 15px;">
    
                <label style="font-weight: bold;">Age:</label>
                <input type="number" id="age" class="swal-input" placeholder="Enter your age" style="padding: 8px; font-size: 15px;">
    
                <label style="font-weight: bold;">Gender:</label>
                <select id="gender" class="swal-input" style="padding: 8px; font-size: 15px;">
                    <option value="" disabled selected>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
    
                <label style="font-weight: bold;">Phone Number:</label>
                <input type="tel" id="phone" class="swal-input" placeholder="Enter phone number" style="padding: 8px; font-size: 15px;">
    
                <label style="font-weight: bold;">Problem Description:</label>
                <input type="text" id="problem" class="swal-input" placeholder="Describe your problem" style="padding: 8px; font-size: 15px;">
    
                <label style="font-weight: bold;">Date:</label>
                <input type="date" id="date" class="swal-input" style="padding: 8px; font-size: 15px;">
    
                <label style="font-weight: bold;">Time:</label>
                <input type="time" id="time" class="swal-input" style="padding: 8px; font-size: 15px;">
    
            </div>
        `;
        return formContainer;
    };
    

    return (
        <div id='doctors'>
            {doctors[0].length > 1 ? (
                <Box sx={{ bgcolor: '#e3f2fd', color: 'primary.main', p: 2, mb: 2, mt: 6, textAlign: "center" }}>
                    <Container maxWidth="xl">
                        <Typography 
                            sx={{ mt: 2, mb: 2, fontWeight: 600, color: '#0d47a1' }} 
                            variant='h5'
                        >
                            Our team is always ready to assist you
                        </Typography>

                        <Grid container spacing={3}>
                            {doctors[0]?.map((doctor) => (
                                <Grid key={doctor.doc_id} item xs={12} sm={6} md={4} lg={3} sx={{ mx: 'auto' }}>
                                    <Card sx={{
                                        height: '100%',  // ✅ Ensures all cards have equal height
                                        display: 'flex', // ✅ Makes content evenly distributed
                                        flexDirection: 'column', // ✅ Aligns items properly
                                        justifyContent: 'space-between', // ✅ Pushes content evenly
                                        boxShadow: 10,
                                        maxWidth: 345, 
                                        transition: '0.5s all ease-in-out', 
                                        bgcolor: 'white',
                                        ':hover': { bgcolor: '#bbdefb', boxShadow: 1 },
                                        'img': { transition: '0.5s all ease-in-out' },
                                        ':hover img': { transform: 'scale(1.1)' }
                                    }}>
                                        <CardActionArea>
                                            <Avatar
                                                alt="doctor image"
                                                src={doctor?.doc_img}
                                                sx={{ width: 256, height: 256, mx: 'auto' }}
                                            />
                                            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}> 
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Specialist in {doctor.specialize}
                                                </Typography>
                                            </CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                Dr. {doctor.name}
                                            </Typography>
                                        </CardActionArea>
                                        <CardActions sx={{ textAlign: "center", justifyContent: "center" }}>
                                            <Button 
                                                onClick={swalAlert} 
                                                sx={{ mt: 2, mb: 1, bgcolor: '#0d47a1', '&:hover': { bgcolor: '#1565c0' } }} 
                                                variant="contained"
                                            >
                                                Make an Appointment
                                                <AddCircleIcon />
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <HashLink smooth to="/home#home" className='text-style'>
                            <Button variant="contained" startIcon={<HomeIcon />} sx={{ mb: 5, mt: 5, bgcolor: '#0d47a1', '&:hover': { bgcolor: '#1565c0' } }}>
                                Back to Home
                            </Button>
                        </HashLink>
                    </Container>
                </Box>
            ) : <LoadingScreen />}
        </div>
    );
};

export default Doctors;
