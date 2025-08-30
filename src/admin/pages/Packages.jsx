import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, TextField, Button, Table, TableHead,
  TableRow, TableCell, TableBody, Paper, TableContainer,
  CircularProgress, Snackbar, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import AdminLayout from '../component/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function ManagePackages() {
  const { authFetch } = useAdminAuth();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    category: '',
    duration: '',
    pricePerRoom: {}
  });
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletePackageId, setDeletePackageId] = useState(null);

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/admin/packages');
      setPackages(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('room')) {
      setFormData(prev => ({
        ...prev,
        pricePerRoom: { ...prev.pricePerRoom, [name]: Number(value) }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const nightsNumber = Number(formData.duration);
      const durationObj = {
        nights: nightsNumber,
        roomOptions: Object.entries(formData.pricePerRoom).map(([key, price]) => ({
          people: Number(key.replace('room', '')),
          price: Number(price)
        }))
      };

      const payload = {
        category: formData.category,
        durations: [durationObj]
      };

      if (editingPackageId) {
        // Update package
        await authFetch(`/api/admin/packages/${editingPackageId}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
        setSnackbar({ open: true, message: 'Package updated!', severity: 'success' });
      } else {
        // Create package
        await authFetch('/api/admin/packages', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        setSnackbar({ open: true, message: 'Package created!', severity: 'success' });
      }

      setFormData({ category: '', duration: '', pricePerRoom: {} });
      setEditingPackageId(null);
      fetchPackages();
    } catch (err) {
      console.error('Package error:', err);
      setSnackbar({ open: true, message: 'Error saving package', severity: 'error' });
    }
  };

  const handleEdit = (pkg, duration) => {
    const pricePerRoom = {};
    duration.roomOptions.forEach(r => {
      pricePerRoom[`room${r.people}`] = r.price;
    });
    setFormData({
      category: pkg.category,
      duration: duration.nights,
      pricePerRoom
    });
    setEditingPackageId(pkg._id);
  };

  const handleDeleteClick = (pkgId) => {
    setDeletePackageId(pkgId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await authFetch(`/api/admin/packages/${deletePackageId}`, { method: 'DELETE' });
      setSnackbar({ open: true, message: 'Package deleted!', severity: 'success' });
      setDeleteDialogOpen(false);
      setDeletePackageId(null);
      fetchPackages();
    } catch (err) {
      console.error('Delete error:', err);
      setSnackbar({ open: true, message: 'Error deleting package', severity: 'error' });
    }
  };

  return (
    <AdminLayout>
      <Typography variant="h4" mb={3}>Manage Packages</Typography>

      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        <TextField label="Category (3⭐, 4⭐, 5⭐)" name="category" value={formData.category} onChange={handleChange} />
        <TextField label="Duration (6 nights / 9 nights)" name="duration" value={formData.duration} onChange={handleChange} />
        {[1, 2, 3, 4].map(n => (
          <TextField
            key={n}
            label={`${n} person(s) per room`}
            name={`room${n}`}
            value={formData.pricePerRoom[`room${n}`] || ''}
            onChange={handleChange}
            type="number"
          />
        ))}
        <Button variant="contained" onClick={handleSubmit}>
          {editingPackageId ? 'Update Package' : 'Save Package'}
        </Button>
      </Box>

      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>1p</TableCell>
                <TableCell>2p</TableCell>
                <TableCell>3p</TableCell>
                <TableCell>4p</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((pkg) =>
                pkg.durations.map((duration) => (
                  <TableRow key={`${pkg._id}-${duration.nights}`}>
                    <TableCell>{pkg.category}</TableCell>
                    <TableCell>{duration.nights}</TableCell>
                    {[1, 2, 3, 4].map((num) => {
                      const room = duration.roomOptions.find((r) => r.people === num);
                      return <TableCell key={num}>{room ? room.price : '-'}</TableCell>;
                    })}
                    <TableCell>
                      <Button size="small" onClick={() => handleEdit(pkg, duration)}>Edit</Button>
                      <Button size="small" color="error" onClick={() => handleDeleteClick(pkg._id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this package?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </AdminLayout>
  );
}
