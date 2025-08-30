import React, { useEffect, useState, useCallback } from 'react';
import { 
  Container, 
  Typography,
  CircularProgress, 
  Paper,
  Divider,
  Grid,
  Chip,
  Box
} from '@mui/material';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import InfoIcon from '@mui/icons-material/Info';
import DashboardLayout from '../../component/Dashboard/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const MyReservation = () => {
  const { user, authFetch } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/user/reservations');
      setReservations(res.data || []);
    } catch (err) {
      console.error('Failed to fetch reservations:', err);
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const getAccentColor = (category) => {
    switch(category.toLowerCase()) {
      case '5 star': return '#1a721dff';
      case '4 star': return '#1a721dff';
      case '3 star': return '#1a721dff';
      default: return '#1a721dff';
    }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4, mt: 5 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome, {user?.fullname || 'Guest'}
        </Typography>

        {loading ? (
          <CircularProgress sx={{ mt: 4 }} />
        ) : reservations.length === 0 ? (
          <Typography sx={{ mt: 4, fontStyle: 'italic', color: 'text.secondary' }}>
            You haven’t booked any packages yet.
          </Typography>
        ) : (
          <Grid container spacing={3} mt={2}>
            {reservations.map((r) => (
              <Grid item xs={12} sm={6} md={4} key={r._id}>
                <Paper 
                  sx={{ 
                    borderRadius: 3, 
                    overflow: 'hidden', 
                    boxShadow: 4, 
                    transition: '0.4s', 
                    "&:hover": { boxShadow: 8, transform: 'translateY(-6px)' }
                  }}
                >
                  {/* Accent bar */}
                  <Box sx={{ height: 6, bgcolor: getAccentColor(r.plan.category) }} />

                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {r.plan.category} Package
                    </Typography>

                    <Divider sx={{ mb: 1 }} />

                    <Box display="flex" alignItems="center" mb={0.5}>
                      <NightsStayIcon fontSize="small" sx={{ mr: 1, color: '#1a721dff' }} />
                      <Typography><strong>Nights:</strong> {r.plan.nights}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={0.5}>
                      <PeopleIcon fontSize="small" sx={{ mr: 1, color: '#1a721dff' }} />
                      <Typography><strong>People per room:</strong> {r.plan.people}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={0.5}>
                      <AttachMoneyIcon fontSize="small" sx={{ mr: 1, color: '#1a721dff' }} />
                      <Typography><strong>Price for room:</strong> ₦{r.plan.price.toLocaleString()}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={0.5}>
                      <AttachMoneyIcon fontSize="small" sx={{ mr: 1, color: '#1a721dff' }} />
                      <Typography><strong>Total:</strong> ₦{r.plan.total.toLocaleString()}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={1}>
                      <DoneAllIcon fontSize="small" sx={{ mr: 1, color: '#1a721dff' }} />
                      <Chip 
                        label={r.status.toUpperCase()} 
                        color={r.status === "paid" ? "success" : r.status === "pending" ? "warning" : "error"} 
                        size="small" 
                      />
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    <Box display="flex" alignItems="center">
                      <InfoIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Your itinerary will be updated soon. Please check back later to see the full breakdown of your package.
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default MyReservation;
