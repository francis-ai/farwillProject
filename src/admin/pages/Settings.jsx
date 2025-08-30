import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import AdminLayout from '../component/AdminLayout';
import axios from 'axios';

export default function Settings() {
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('adminToken');

  const [form, setForm] = useState({
    site_title: '',
    contact_email: '',
    phone: '',
    address: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${baseUrl}/admin/settings`, {
          headers: { Authorization: `Token ${token}` }
        });
        if (res.data) setForm(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSettings();
  }, [baseUrl, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}/admin/settings`, form, {
        headers: { Authorization: `Token ${token}` }
      });
      setSnackbar({ open: true, message: 'Settings updated successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Update failed.',
        severity: 'error'
      });
    }
  };

  return (
    <AdminLayout>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Website Settings
      </Typography>

      <Paper sx={{ p: 4, mt: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Website Title"
                name="site_title"
                value={form.site_title}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Email"
                name="contact_email"
                type="email"
                value={form.contact_email}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" size="large">
                Save Settings
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AdminLayout>
  );
}
