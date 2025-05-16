import React from 'react';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import GoogleButton from 'react-google-button';
import './Login.css';
import useAuth from '../../../Hooks/useAuth';
import UserProfile from './UserProfile/UserProfile';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import { Fingerprint } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const { singInUsingGoogle, handlePasswordReset, user, setUser, mail, singInUsingFacebook, singInUsingGithub, handleRegister, handleEmail, handlePass, error, setError, toggleLogin, setIsLoading } = useAuth();

    //location is used for private routes
    const location = useLocation();
    const history = useHistory();
    const redirect_url = location.state?.from || '/profile';

    const handleGoogleSignIn = () => {
        singInUsingGoogle()
            .then((result) => {
                const loggedInUser = result.user;
                setUser(loggedInUser);
                history.push(redirect_url);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    };

    const handleFacebookSignIn = () => {
        singInUsingFacebook()
            .then((result) => {
                const loggedInUser = result.user;
                setUser(loggedInUser);
                history.push(redirect_url);
            }).catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    };

    const handleGithubSignIn = () => {
        singInUsingGithub()
            .then((result) => {
                const loggedInUser = result.user;
                setUser(loggedInUser);
                history.push(redirect_url);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }} >
            <Container id='login' maxWidth="xl">
                {
                    user?.email ? <UserProfile /> : (
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 15,
                                    marginBottom: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                    <LoginIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign In
                                </Typography>
                                <Box component="div" noValidate sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                onBlur={handleEmail}
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                onBlur={handlePass}
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                            />
                                            <Typography sx={{ p: 1 }} color="red">
                                                {error}
                                            </Typography>
                                        </Grid>
                                        {mail && (
                                            <Button className='body-link-text-style' variant="body2" onClick={handlePasswordReset}>
                                                Forget Password? Reset now
                                            </Button>
                                        )}
                                    </Grid>

                                    {/* Login Button */}
                                    <Button
                                        onClick={handleRegister}
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            mt: 3,
                                            mb: 2,
                                            bgcolor: '#3366CC', // Medium Blue
                                            '&:hover': { bgcolor: '#1E90FF' } // Dodger Blue on hover
                                        }}
                                    >
                                        <Fingerprint /> Login
                                    </Button>
                                </Box>

                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Button onClick={toggleLogin(true)}>
                                            <Link className='body-link-text-style' to="/register" variant="body2">
                                                New here? Register
                                            </Link>
                                        </Button>
                                    </Grid>
                                </Grid>

                                {/* Google Sign-In Button */}
                                <Grid container sx={{ mt: 2, mb: 3 }} justifyContent="flex-end">
                                    <Grid item>
                                        <GoogleButton
                                            className='google-btn'
                                            type="dark"
                                            onClick={handleGoogleSignIn}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Social Media Login Buttons */}
                                <Grid container sx={{ mb: 3 }} justifyContent="flex-end">
                                    <Grid item>
                                        <Button
                                            onClick={handleFacebookSignIn}
                                            variant="contained"
                                            sx={{
                                                p: 1,
                                                bgcolor: '#3366CC', // Medium Blue
                                                '&:hover': { bgcolor: '#1E90FF' } // Dodger Blue on hover
                                            }}
                                        >
                                            <FacebookIcon /> Facebook
                                        </Button>
                                    </Grid>

                                    <Typography textAlign="center" sx={{ p: 2 }}>Or</Typography>

                                    <Grid item>
                                        <Button
                                            onClick={handleGithubSignIn}
                                            variant="contained"
                                            sx={{
                                                p: 1,
                                                mb: 2,
                                                bgcolor: '#3366CC', // Medium Blue
                                                '&:hover': { bgcolor: '#1E90FF' } // Dodger Blue on hover
                                            }}
                                        >
                                            <GitHubIcon /> GitHub
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Container>
                    )
                }
            </Container>
        </Box>
    );
};

export default Login;
