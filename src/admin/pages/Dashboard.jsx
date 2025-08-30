import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../component/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';

import {
  People as UsersIcon,
  ConfirmationNumber as TicketsIcon,
  Hotel as HotelsIcon,
  CalendarToday as ScheduleIcon,
  SupportAgent as TransportIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const menuItems = [
  { name: 'Users', path: '/admin/manage-users', icon: <UsersIcon fontSize="large" /> },
  { name: 'Packages', path: '/admin/packages', icon: <TicketsIcon fontSize="large" /> },
  { name: 'Reservations', path: '/admin/reservations', icon: <HotelsIcon fontSize="large" /> },
  { name: 'Faqs', path: '/admin/faqs', icon: <ScheduleIcon fontSize="large" /> },
  { name: 'Support', path: '/admin/support', icon: <TransportIcon fontSize="large" /> },
  { name: 'Settings', path: '/admin/settings', icon: <SettingsIcon fontSize="large" /> },
];

export default function Dashboard() {
  const { admin } = useAdminAuth();
  const navigate = useNavigate();


  return (
    <AdminLayout>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>

      <Typography variant="body1" gutterBottom color="textSecondary">
        Welcome back {admin.email}
      </Typography>

      <Grid container spacing={3}>
        {menuItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                p: 2,
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 6
                }
              }}
              onClick={() => navigate(item.path)}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <IconButton color="primary">{item.icon}</IconButton>
                  <Typography variant="h6">{item.name}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </AdminLayout>
  );
}
