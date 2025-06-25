import React from 'react';
import DashboardLayout from '../../component/Dashboard/DashboardLayout';
import { Typography, Container } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.full_name || 'Guest'}
        </Typography>
        <Typography variant="body1">
          Email: {user?.email || 'Not Availiable'}
        </Typography>
      </Container>
    </DashboardLayout>
  );
}