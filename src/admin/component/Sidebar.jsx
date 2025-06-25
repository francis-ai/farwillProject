import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  People as UsersIcon,
  ConfirmationNumber as TicketsIcon,
  // Hotel as HotelsIcon,
  CalendarToday as ScheduleIcon,
  DirectionsBus as TransportIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';

const menuItems = [
  { name: 'Dashboard', path: '/admin/', icon: <DashboardIcon /> },
  { name: 'Users', path: '/admin/manage-users', icon: <UsersIcon /> },
  { name: 'Packages', path: '/admin/packages', icon: <TicketsIcon /> },
  // { name: 'Hotels', path: '/admin/hotels', icon: <HotelsIcon /> },
  { name: 'Faqs', path: '/admin/faqs', icon: <ScheduleIcon /> },
  { name: 'Support', path: '/admin/support', icon: <TransportIcon /> },
  { name: 'Settings', path: '/admin/settings', icon: <SettingsIcon /> },
  { name: 'Logout', path: '/logout', icon: <LogoutIcon /> }
];

export default function AdminSidebar({ onItemClick }) {
  return (
    <>
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <Typography variant="h6" sx={{ color: '#fff', textAlign: 'center' }}>
          AFCON Admin
        </Typography>
      </Box>
      
      <List sx={{ p: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={onItemClick}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.active': {
                  bgcolor: 'primary.main',
                  '& .MuiListItemIcon-root': { color: '#fff' },
                  '& .MuiListItemText-primary': { color: '#fff' }
                },
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.08)'
                }
              }}
            >
              <ListItemIcon sx={{ color: '#b2bac2', minWidth: '40px' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.name} 
                primaryTypographyProps={{ 
                  color: '#e0e0e0',
                  fontWeight: 'medium'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}