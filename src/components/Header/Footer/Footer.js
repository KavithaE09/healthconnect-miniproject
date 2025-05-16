import React from 'react';
import { Avatar, Box, Chip, Container, Divider, Grid, Stack, styled, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import HealingTwoToneIcon from '@mui/icons-material/HealingTwoTone';
import CallIcon from '@mui/icons-material/Call';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { blue } from '@mui/material/colors';
import { HashLink } from 'react-router-hash-link';
import './Footer.css';

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
        marginTop: theme.spacing(2),
    },
}));

const Footer = () => {
    return (
        <footer style={{ position: 'relative', bottom: '0', width: '100%', marginTop: 'auto' }}>
            <Box className='footer-container' sx={{ bgcolor: '#bbdefb', color: 'text.secondary', py: 3 }}>
                <Container maxWidth="xl">
                    <Grid container spacing={3} columns={12} justifyContent="center">
                        
                        {/* Left Section */}
                        <Grid item xs={12} sm={4}>
                            <Box>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ bgcolor: 'white', mr: 1 }}>
                                        <HealingTwoToneIcon sx={{ color: blue[700] }} />
                                    </Avatar>
                                    Health Connect
                                </Typography>
                                <Divider />
                            </Box>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                                <Avatar sx={{ bgcolor: blue[500] }}>
                                    <EmailIcon />
                                </Avatar>
                                <a className='text-style' href="mailto:xxxx@gmail.com">xxxx@gmail.com</a>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                                <Avatar sx={{ bgcolor: blue[500] }}>
                                    <CallIcon />
                                </Avatar>
                                <a className='text-style' href="tel:80154xxxxx">80154xxxxx</a>
                            </Stack>
                        </Grid>

                        {/* Middle Section - Services */}
                        <Grid item xs={12} sm={4}>
                            <Root>
                                <Divider><Chip label="Our Services" /></Divider>
                            </Root>
                            <Box sx={{ mt: 2 }}>
                                <HashLink className='text-style' to='/doctors#doctors'>Find a Doctor</HashLink>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <HashLink className='text-style' to='/nearby-hospitals'>Nearby Hospitals</HashLink>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <HashLink className='text-style' to='/appointment#appointment'>Make An Appointment</HashLink>
                            </Box>
                            <Box sx={{ mt: 1 }}>
                                <HashLink className='text-style' to='/medicines#medicines'>Buy Medicine</HashLink>
                            </Box>
                        </Grid>

                        {/* Right Section - Social Media */}
                        <Grid item xs={12} sm={4}>
                            <Root>
                                <Divider><Chip label="Find us on social media" /></Divider>
                            </Root>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                                <Avatar sx={{ bgcolor: blue[500] }}>
                                    <FacebookIcon />
                                </Avatar>
                                <a className='text-style' href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                    Health Connect on Facebook
                                </a>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                                <Avatar sx={{ bgcolor: blue[500] }}>
                                    <LinkedInIcon />
                                </Avatar>
                                <a className='text-style' href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                    Health Connect on LinkedIn
                                </a>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                                <Avatar sx={{ bgcolor: blue[500] }}>
                                    <GitHubIcon />
                                </Avatar>
                                <a className='text-style' href="https://github.com/Foy5al" target="_blank" rel="noopener noreferrer">
                                    Health Connect on GitHub
                                </a>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Divider sx={{ mt: 2 }} />
                </Container>
            </Box>
        </footer>
    );
};

export default Footer;
