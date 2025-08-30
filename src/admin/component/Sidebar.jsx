import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box, Divider } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  People as UsersIcon,
  ConfirmationNumber as TicketsIcon,
  Hotel as HotelsIcon,
  CalendarToday as ScheduleIcon,
  DirectionsBus as TransportIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useAdminAuth } from '../../context/AdminAuthContext';

const menuItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: <DashboardIcon /> },
  { name: 'Users', path: '/admin/manage-users', icon: <UsersIcon /> },
  { name: 'Packages', path: '/admin/packages', icon: <TicketsIcon /> },
  { name: 'Manage Fees', path: '/admin/manage-fees', icon: <TicketsIcon /> },
  { name: 'Reservations', path: '/admin/reservations', icon: <HotelsIcon /> },
  { name: 'Faqs', path: '/admin/faqs', icon: <ScheduleIcon /> },
  { name: 'Support', path: '/admin/support', icon: <TransportIcon /> },
  { name: 'Settings', path: '/admin/settings', icon: <SettingsIcon /> },
  { name: 'Logout', path: '/admin/logout', icon: <LogoutIcon />, logout: true } // add flag for logout
];

export default function AdminSidebar({ onItemClick }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    if (item.logout) {
      logout();
      navigate('/admin/login');
    }
    if (onItemClick) onItemClick();
  };

  return (
    <>
      {/* Admin info */}
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.12)', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#fff' }}>
          AFCON Admin
        </Typography>
        {admin && (
          <>
            <Typography variant="body2" sx={{ color: '#e0e0e0', mt: 0.5 }}>
              {admin.email}
            </Typography>
            {/* Optional: display name if you store fullname */}
            {admin.fullname && (
              <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                {admin.fullname}
              </Typography>
            )}
          </>
        )}
      </Box>
      <Divider />
      <List sx={{ p: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={item.logout ? 'button' : NavLink}
              to={item.logout ? undefined : item.path}
              onClick={() => handleItemClick(item)}
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
