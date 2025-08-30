import { Box, List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { Link } from 'react-router-dom'; 
import {
  ChevronLeft,
  Dashboard as DashboardIcon,
  CalendarToday as ScheduleIcon,
  Hotel as HotelIcon,
  ConfirmationNumber as TicketIcon,
  Map as ItineraryIcon,
  AccountCircle as ProfileIcon,
  SupportAgent as SupportIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';


const Sidebar = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'My Reservation', icon: <HotelIcon />, path: '/reservation' },
    { text: 'My Itinerary', icon: <ItineraryIcon />, path: '/my-itinerary' },
    { text: 'Tickets', icon: <TicketIcon />, path: '/my-tickets' },
    { text: 'Schedule', icon: <ScheduleIcon />, path: '/my-schedule' },
    { text: 'Profile', icon: <ProfileIcon />, path: '/profile' },
    { text: 'Support', icon: <SupportIcon />, path: '/support' },
    { text: 'Logout', icon: <LogoutIcon />, path: '/logout' }
  ];


  return (
    <Box
      sx={{
        width: 260,
        height: isMobile ? '100vh' : 'auto',
        position: isMobile ? 'fixed' : 'relative',
        left: 0,
        top: 0,
        backgroundColor: theme.palette.background.paper,
        boxShadow: isMobile ? 3 : 0, 
        transform: isOpen || !isMobile ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        zIndex: isMobile ? 1200 : 'auto',
        pt: { xs: 6, md: 1 },
        mt: isMobile ? '75px' : '75px',
        overflowY: 'auto',
        ...(isMobile
          ? {}
          : {
              height: 'auto',
              borderRight: `1px solid ${theme.palette.divider}`,
            }),
      }}
    >
      <IconButton 
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          display: { md: 'none' } 
        }}
      >
        <ChevronLeft />
      </IconButton>

      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text}
            component={Link}
            to={item.path}
            sx={{color: 'black',
            
            }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;