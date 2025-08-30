import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  CircularProgress,
  TextField,
  Pagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import AdminLayout from '../component/AdminLayout';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';

const BASE_URL = process.env.REACT_APP_API_URL;
const ITEMS_PER_PAGE = 10;

export default function ManageUser() {
  const { token, admin } = useAdminAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateData, setUpdateData] = useState({ role: '', status: '' });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data?.data || []);
    } catch (err) {
      console.error('Failed to fetch users:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchUsers();
  }, [fetchUsers, token]);

  const handleView = (user) => {
    setSelectedUser(user);
    setUpdateData({ role: user.role || '', status: user.status || '' });
    setOpenModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`${BASE_URL}/admin/users/${selectedUser._id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setOpenModal(false);
      setSelectedUser(null);
      setUpdateData({ role: '', status: '' });
      fetchUsers();
    } catch (err) {
      console.error('Failed to update user:', err.response?.data || err.message);
    }
  };

  // Filter & paginate users
  const filteredUsers = users.filter(user =>
    user.fullname?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <AdminLayout>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Manage Users
      </Typography>
      <Typography mb={2}>Welcome back, {admin.email}!</Typography>

      <Box mb={2} display="flex" justifyContent="flex-end">
        <TextField
          label="Search users..."
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S/N</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Date Registered</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.length > 0 ? paginatedUsers.map((user, idx) => (
                  <TableRow key={user._id}>
                    <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</TableCell>
                    <TableCell>{user.fullname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role || 'User'}</TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" onClick={() => handleView(user)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">No users found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {pageCount > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}

      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>User Details</DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <>
              <Typography><strong>Name:</strong> {selectedUser.fullname}</Typography>
              <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateUser}>Update</Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}