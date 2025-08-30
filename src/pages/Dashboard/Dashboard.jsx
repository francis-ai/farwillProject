import React from 'react';
import DashboardLayout from '../../component/Dashboard/DashboardLayout';
import { Typography, Container, Grid, Paper, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  // Demo data for cards
  const demoCards = [
    {
      title: 'Profile Info',
      value: user?.fullname || 'Guest',
      icon: <AccountCircleIcon sx={{ fontSize: 40, color: '#f57c00' }} />,
      note: 'Manage your account details'
    },
    {
      title: 'My Reservations',
      value: '1', // example number
      icon: <EventNoteIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      note: 'Check all your booked packages'
    },
  ];

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome, {user?.fullname || 'Guest'}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Email: {user?.email || 'Not Available'}
        </Typography>

        <Grid container spacing={3}>
          {demoCards.map((card, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: '0.3s',
                  "&:hover": { boxShadow: 8, transform: 'translateY(-5px)' },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <Box mb={2}>{card.icon}</Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  {card.value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {card.note}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
