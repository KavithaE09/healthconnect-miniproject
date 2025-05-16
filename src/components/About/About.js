import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const About = () => {
    return (
        <Box id='about' sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '70vh'
        }}
            points="0,100 50,00, 100,100" >
            <Container maxWidth="xl">
                <Typography sx={{ color: '#4A90E2', mx: 2, p: 2, textAlign: "center" }}
                    variant='h4'>
                    All-in-One Website Health Solution
                </Typography>

                <Typography sx={{ mx: 2, p: 2, textAlign: "center" }}
                    variant='h6'>
                    Connecting You to Better Healthcare
                </Typography>

                <Typography sx={{ mx: 2, p: 2, mb: 4, textAlign: "justify" }}
                    variant='p'>At Health Connect, we make finding and booking medical services easier than ever.
                    Our platform lets you book doctor and specialist appointments, locate nearby hospitals for routine and monthly checkups and order prescribed medicines online.
                    Keep all your scan files, prescriptions and medical history in one secure place—and get automated reminders for checkups and medication refills. <br /><br />

                   <strong>Fair & Accurate Hospital Reviews</strong><br /><br />

                   <Typography sx={{ mx: 2, p: 2, mb: 4, textAlign: "justify" }}
                 variant='p'> Online hospital reviews often suffer from negative bias, where only dissatisfied patients leave feedback. But we believe that most patients have positive experiences, and their voices should be heard too.

                        That’s why Health Connect provides a balanced and fair review system, helping patients make informed healthcare decisions without unnecessary negativity.<br /><br />
                        </Typography>

                        <strong>Smart Hospital & Doctor Recommendations</strong><br /><br />

                        <Typography sx={{ mx: 2, p: 2, mb: 4, textAlign: "justify" }}
                         variant='p'> Not sure where to go for treatment? Health Connect uses smart recommendations to suggest the best hospitals and doctors near you based on your location and medical needs. Get access to trusted healthcare providers with just a few clicks!
                       </Typography><br /><br />

                        <strong>Your Voice Matters!!</strong><br /><br />
                        <Typography sx={{ mx: 2, p: 2, mb: 4, textAlign: "justify" }}
                    variant='p'>   Have you recently visited a hospital? Leave a review on Health Connect and help others choose the best care. Whether good or bad, your experience matters!

                     💬 Share your thoughts in the comments or message us on Facebook @HealthConnectOfficial.

                        Health Connect – Your Trusted Healthcare Companion.  </Typography>

                    
                    <br /><br /><br />
                </Typography>

            </Container>
        </Box>
    );
};

export default About;
