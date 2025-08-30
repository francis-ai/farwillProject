// src/pages/admin/Support.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../component/AdminLayout";
import { useAdminAuth } from "../../context/AdminAuthContext";
import {
  Typography,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

export default function Support() {
  const { admin, authFetch } = useAdminAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Reply modal states
  const [openReply, setOpenReply] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [status, setStatus] = useState("closed");

  // Snackbar states
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchTickets = React.useCallback(async () => {
    try {
      const res = await authFetch("/api/admin/support");
      console.log("📩 API Response:", res);

      setTickets(res.tickets || []);
    } catch (err) {
      console.error("Error fetching support tickets:", err);
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open reply modal
  const handleOpenReply = (ticket) => {
    setSelectedTicket(ticket);
    setReplyMessage("");
    setStatus("closed");
    setOpenReply(true);
  };

  const handleCloseReply = () => {
    setOpenReply(false);
    setSelectedTicket(null);
  };

  // Submit reply
  const handleReplySubmit = async () => {
    if (!replyMessage.trim()) {
      setSnackbar({ open: true, message: "Reply message cannot be empty", severity: "error" });
      return;
    }

    try {
      const res = await authFetch(`/api/admin/support/${selectedTicket._id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replyMessage, status }),
      });

      if (res.message) {
        setSnackbar({ open: true, message: "Reply sent successfully!", severity: "success" });
        handleCloseReply();
        fetchTickets(); // refresh tickets after update
      } else {
        throw new Error("Failed to send reply");
      }
    } catch (err) {
      console.error("Error sending reply:", err);
      setSnackbar({ open: true, message: "Failed to send reply", severity: "error" });
    }
  };

  return (
    <AdminLayout>
      <Typography variant="h5" gutterBottom>
        Support Tickets
      </Typography>
      <Typography variant="body2" gutterBottom>
        Admin: {admin?.email}
      </Typography>

      <Box sx={{ mt: 3 }}>
        {loading ? (
          <CircularProgress />
        ) : tickets.length === 0 ? (
          <Typography variant="body2" sx={{ p: 2, textAlign: "center" }}>
            No support tickets found.
          </Typography>
        ) : (
          <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Attended</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tickets
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((ticket, index) => (
                      <TableRow key={ticket._id}>
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>{ticket.email}</TableCell>
                        <TableCell>{ticket.message}</TableCell>
                        <TableCell>{ticket.status}</TableCell>
                        <TableCell>{ticket.attended ? "✅ Yes" : "❌ No"}</TableCell>
                        <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleOpenReply(ticket)}
                          >
                            Reply
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={tickets.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20]}
            />
          </Paper>
        )}
      </Box>

      {/* Reply Modal */}
      <Dialog open={openReply} onClose={handleCloseReply} maxWidth="sm" fullWidth>
        <DialogTitle>Reply to Ticket</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            <strong>User:</strong> {selectedTicket?.email}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Message:</strong> {selectedTicket?.message}
          </Typography>

          <TextField
            label="Reply Message"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />

          <TextField
            select
            label="Status"
            fullWidth
            margin="normal"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReply}>Cancel</Button>
          <Button variant="contained" onClick={handleReplySubmit}>
            Send Reply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </AdminLayout>
  );
}
