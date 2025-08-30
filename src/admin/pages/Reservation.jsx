import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TableFooter,
  TablePagination
} from '@mui/material';
import AdminLayout from '../component/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';

const BASE_URL = process.env.REACT_APP_API_URL;

const Reservation = () => {
  const { admin, authFetch } = useAdminAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authFetch('/api/admin/reservation');
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

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter by user email or plan category
  const filteredReservations = reservations.filter((r) =>
    r.user.email.toLowerCase().includes(search.toLowerCase()) ||
    r.plan.category.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedReservations = filteredReservations.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <AdminLayout>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom color="textSecondary">
        Welcome back {admin.email}
      </Typography>

      <Box mt={3} mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          label="Search by user or plan"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Box>
          <Button variant="contained" onClick={fetchReservations}>
            Refresh
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => window.open(`${BASE_URL}/api/admin/reservations/export`, "_blank")}
          >
            Download Excel
          </Button>
        </Box>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : filteredReservations.length === 0 ? (
        <Typography>No reservations yet.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: '#989997cf', color: 'white' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>User Email</TableCell>
                <TableCell sx={{ color: 'white' }}>Plan</TableCell>
                <TableCell sx={{ color: 'white' }}>People</TableCell>
                <TableCell sx={{ color: 'white' }}>Nights</TableCell>
                <TableCell sx={{ color: 'white' }}>Price</TableCell>
                <TableCell sx={{ color: 'white' }}>Total</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedReservations.map((r) => (
                <TableRow key={r._id}>
                  <TableCell>{r.user.email}</TableCell>
                  <TableCell>{r.plan.category}</TableCell>
                  <TableCell>{r.plan.people}</TableCell>
                  <TableCell>{r.plan.nights}</TableCell>
                  <TableCell>₦{r.plan.price.toLocaleString()}</TableCell>
                  <TableCell>₦{r.plan.total.toLocaleString()}</TableCell>
                  <TableCell>{r.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => alert(`Assign/update itinerary for ${r.user.email}`)}
                    >
                      Assign Itinerary
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={filteredReservations.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25]}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </AdminLayout>
  );
};

export default Reservation;
