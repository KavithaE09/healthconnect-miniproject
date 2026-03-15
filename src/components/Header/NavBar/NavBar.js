import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HealingTwoToneIcon from '@mui/icons-material/HealingTwoTone';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { HashLink } from 'react-router-hash-link';
import useAuth from '../../../Hooks/useAuth';
import { useCart } from '../../../store/CartContext'; // ← import your cart hook
import './NavBar.css';

const settings = ['Profile', 'Logout'];

const Navbar = () => {
  const { logout, user } = useAuth();
  const { displayName, photoURL } = user;
  const history = useHistory();

  const { cartItems } = useCart(); // ← get cart items
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0); // ← total quantity

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElDashboard, setAnchorElDashboard] = useState(null);

  const handleOpenUserMenu = (e) => setAnchorElUser(e.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleUserControl = (e) => {
    const choice = e.currentTarget.innerText;
    if (choice === 'Logout') logout();
    else if (choice === 'Profile') history.push('/profile');
  };

  const handleOpenDashboard = (e) => setAnchorElDashboard(e.currentTarget);
  const handleCloseDashboard = () => setAnchorElDashboard(null);

  return (
    <Box sx={{ mt: 8 }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#4682B4' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Dashboard Menu */}
            <IconButton onClick={handleOpenDashboard} sx={{ color: 'white', mr: 1 }}>
              <DashboardCustomizeIcon fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={anchorElDashboard}
              open={Boolean(anchorElDashboard)}
              onClose={handleCloseDashboard}
            >
              <MenuItem component={HashLink} smooth to="/doctors#doctors" onClick={handleCloseDashboard}>
                Doctors
              </MenuItem>
              <MenuItem component={HashLink} smooth to="/appointment#appointment" onClick={handleCloseDashboard}>
                Appointment
              </MenuItem>
              <MenuItem component={HashLink} smooth to="/medicines#medicines" onClick={handleCloseDashboard}>
                Medicines
              </MenuItem>
              <Divider />
              <MenuItem component={Link} to="/nearby-hospitals" onClick={handleCloseDashboard}>
                Nearby Hospitals
              </MenuItem>
              <MenuItem component={Link} to="/reminders" onClick={handleCloseDashboard}>
                Reminders
              </MenuItem>
              <MenuItem component={Link} to="/video-consultation" onClick={handleCloseDashboard}>
                Online Consultation
              </MenuItem>
              <MenuItem component={Link} to="/medical-history" onClick={handleCloseDashboard}>
                Medical History
              </MenuItem>
              <MenuItem component={Link} to="/cart" onClick={handleCloseDashboard}>
                Your Cart
              </MenuItem>
            </Menu>

            {/* Logo & Title */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <HealingTwoToneIcon fontSize="large" />
              Health Connect
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <HashLink className="text-style" smooth to="/home#home">
                <Button sx={{ color: 'white', '&:hover': { backgroundColor: '#5A9BD5' } }}>
                  Home
                </Button>
              </HashLink>
              <HashLink className="text-style" smooth to="/nearby-hospitals">
                <Button sx={{ color: 'white', '&:hover': { backgroundColor: '#5A9BD5' } }}>
                  Nearby Hospitals
                </Button>
              </HashLink>
              <HashLink className="text-style" smooth to="/doctors#doctors">
                <Button sx={{ color: 'white', '&:hover': { backgroundColor: '#5A9BD5' } }}>
                  Doctors
                </Button>
              </HashLink>
              <HashLink className="text-style" smooth to="/appointment#appointment">
                <Button sx={{ color: 'white', '&:hover': { backgroundColor: '#5A9BD5' } }}>
                  Appointment
                </Button>
              </HashLink>
              <HashLink className="text-style" smooth to="/medicines#medicines">
                <Button sx={{ color: 'white', '&:hover': { backgroundColor: '#5A9BD5' } }}>
                  Medicines
                </Button>
              </HashLink>
              <HashLink className="text-style" smooth to="/about#about">
                <Button sx={{ color: 'white', '&:hover': { backgroundColor: '#5A9BD5' } }}>
                  About
                </Button>
              </HashLink>

              <Link to="/reminders" className="text-style">
                <Button sx={{ color: 'white', '&:hover': { backgroundColor: '#5A9BD5' } }}>
                  Reminders
                </Button>
              </Link>
              <Link to="/medical-history" className="text-style">
                <Button sx={{ color: 'white', '&:hover': { backgroundColor: '#5A9BD5' } }}>
                  Medical History
                </Button>
              </Link>

              {/* Cart Button with Badge */}
              <Link to="/cart">
                <Button
                  sx={{
                    color: 'white',
                    '&:hover': { backgroundColor: '#5A9BD5' },
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  Cart
                  <Badge
                    badgeContent={cartCount}
                    color="error"
                    sx={{
                      marginLeft: '5px',
                      fontSize: '0.9rem',
                      verticalAlign: 'top',
                    }}
                    showZero
                  />
                </Button>
              </Link>
            </Box>

            {/* User Avatar & Settings */}
            {user?.email && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User" src={photoURL || "/static/images/avatar/2.jpg"} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Typography sx={{ p: '5px' }} color="primary" textAlign="center">
                    Hi, {displayName}
                  </Typography>
                  <Divider />
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleUserControl}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
