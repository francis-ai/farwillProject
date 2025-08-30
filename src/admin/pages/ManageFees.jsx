import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, TextField, Button, Paper,
  CircularProgress, Snackbar, Alert
} from '@mui/material';
import AdminLayout from '../component/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function ManageFees() {
  const { authFetch } = useAdminAuth();
  const [fees, setFees] = useState({
    visaFee: '',
    airportPickupFee: '',
    miscFee: '',
    ticketPrice: '',
    marginPercentage: 20
  });
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchFees = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/admin/fees');
      if (res.data) setFees(res.data);
    } catch (err) {
      console.error('Failed to fetch fees:', err);
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchFees();
  }, [fetchFees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFees(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async () => {
    try {
      // Check if fees already exist (PUT), else create (POST)
      const method = fees._id ? 'PUT' : 'POST';
      const url = fees._id ? `/api/admin/fees/${fees._id}` : '/api/admin/fees';

      await authFetch(url, {
        method,
        body: JSON.stringify(fees)
      });

      setSnackbar({ open: true, message: 'Fees saved successfully!', severity: 'success' });
      fetchFees();
    } catch (err) {
      console.error('Failed to save fees:', err);
      setSnackbar({ open: true, message: 'Error saving fees', severity: 'error' });
    }
  };

  if (loading) return <AdminLayout><CircularProgress /></AdminLayout>;

  return (
    <AdminLayout>
      <Typography variant="h4" mb={3}>Manage Fees</Typography>

      <Box component={Paper} p={3} display="flex" flexDirection="column" gap={2} maxWidth={500}>
        <TextField
          label="Visa Fee"
          name="visaFee"
          value={fees.visaFee}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="Airport Pickup Fee"
          name="airportPickupFee"
          value={fees.airportPickupFee}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="Miscellaneous Fee"
          name="miscFee"
          value={fees.miscFee}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="Match Ticket Price"
          name="ticketPrice"
          value={fees.ticketPrice}
          onChange={handleChange}
          type="number"
        />
        <TextField
          label="Margin Percentage"
          name="marginPercentage"
          value={fees.marginPercentage}
          onChange={handleChange}
          type="number"
        />

        <Button variant="contained" onClick={handleSubmit}>Save Fees</Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </AdminLayout>
  );
}