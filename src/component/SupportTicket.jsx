import React, { useState } from "react";
import {
  Fab,
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function SupportTicket() {
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/public/support`, formData);

      setSnackbar({
        open: true,
        message: "Your request has been submitted. Our team will contact you via email.",
        severity: "success",
      });

      setFormData({ email: "", message: "" }); // reset form
      handleClose();
    } catch (err) {
      console.error("Support Ticket Error:", err.response?.data || err.message);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Failed to submit ticket. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Fab
        aria-label="support"
        onClick={handleOpen}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: "#046f04",
          color: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          "&:hover": {
            backgroundColor: "#058b05",
            transform: "scale(1.08)",
            boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        <SupportAgentIcon sx={{ fontSize: 28 }} />
      </Fab>

      {/* Modal Form */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 250, md: 400 },
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Submit Support Ticket
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              label="Your Email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              name="message"
              label="Your Request"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: "#046f04" }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
