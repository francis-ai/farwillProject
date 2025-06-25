import React, { useState } from 'react';
import { 
  AppBar, Toolbar, IconButton, Typography, Box, Drawer,
  List, ListItem, ListItemButton, ListItemText, Button,
  Stack, Avatar, Menu, MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import logo from '../assets/images/farwill.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Theme setup
const afconTheme = createTheme({
  palette: {
    primary: { main: '#046f04', contrastText: '#fff' },
    secondary: { main: '#FFD700', contrastText: '#000' },
  },
});

// Animation
const underlineAnimation = keyframes`
  from { transform: scaleX(0); opacity: 0; }
  to { transform: scaleX(1); opacity: 1; }
`;

// Style objects (defined first)
const authButtonStyles = {
  mb: 2,
  fontWeight: 600,
  borderRadius: '12px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  py: 1.2,
  transition: 'all 0.3s ease',
  '&:hover': { transform: 'translateY(-2px)' }
};

const navLinkStyles = {
  textDecoration: 'none',
  color: '#fff',
  fontWeight: 600,
  fontSize: '17px',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#FFD700',
    transform: 'translateY(-2px)',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -4,
      left: 0,
      width: '100%',
      height: 2,
      bgcolor: '#FFD700',
      animation: `${underlineAnimation} 0.3s forwards`,
    }
  }
};

const desktopAuthStyles = {
  color: '#fff',
  borderColor: 'rgba(255, 255, 255, 0.5)',
  '&:hover': {
    borderColor: '#FFD700',
    color: '#FFD700',
    bgcolor: 'rgba(255, 215, 0, 0.1)'
  }
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Packages', id: 'packages' },
    { name: 'Transportation', id: 'transportation' },
    { name: 'Tickets', id: 'tickets' },
    { name: 'Accomodation', id: 'accomodation' },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => { logout(); handleMenuClose(); };

  const drawer = (
    <Box sx={{ width: 250, height: '100%', bgcolor: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton onClick={handleDrawerToggle} sx={{ color: '#046f04', '&:hover': { color: '#FFD700' } }}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ textAlign: 'right', px: 3, color: '#000', '&:hover': { bgcolor: 'rgba(4, 111, 4, 0.1)' }}}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 3, mt: 'auto'}}>
        {user ? (
          <Box 
          component={Link}
          to="/dashboard"
          sx={{ display: 'flex', alignItems: 'center', gap: 2, textDecoration: 'none', color: 'black'  }}>
            <Avatar sx={{ bgcolor: '#046f04' }}>
              {user.full_name?.charAt(0) || user.email?.charAt(0)}
            </Avatar>
            <Typography>{user.full_name || user.email}</Typography>
          </Box>
        ) : (
          <>
            <Button fullWidth variant="outlined" href="/signin" sx={authButtonStyles}>
              Sign In
            </Button>
            <Button fullWidth variant="contained" href="/signup" sx={{ ...authButtonStyles, bgcolor: '#FFD700', color: '#000' }}>
              Sign Up
            </Button>
          </>
        )}
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={afconTheme}>
      <AppBar position="fixed" sx={{ bgcolor: '#046f04', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1 }}>
            <img src={logo} alt="logo" style={{ height: '75px', width: 'auto' }} />
          </Typography>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4 }}>
            {navItems.map((item) => (
              <Box key={item.id} sx={{ position: 'relative' }}>
                <Typography 
                  component="a" 
                  href={`#${item.id}`}
                  sx={navLinkStyles}
                >
                  {item.name}
                </Typography>
              </Box>
            ))}

            {user ? (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: '#FFD700', color: '#000' }}>
                    {user.full_name?.charAt(0) || user.email?.charAt(0)}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                  component={Link}
                  to="/dashboard"
                  onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Stack direction="row" spacing={2} sx={{ ml: 3 }}>
                <Button variant="outlined" href="/signin" sx={desktopAuthStyles}>
                  Sign In
                </Button>
                <Button variant="contained" href="/signup" sx={{ ...desktopAuthStyles, bgcolor: '#FFD700', color: '#000' }}>
                  Sign Up
                </Button>
              </Stack>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' }, ml: 'auto' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: 250 } }}
      >
        {drawer}
      </Drawer>
    </ThemeProvider>
  );
}