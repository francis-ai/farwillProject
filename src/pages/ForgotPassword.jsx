import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Snackbar, 
  Alert, 
  Box 
} from '@mui/material';
import { Email } from '@mui/icons-material';
import AuthLayout from '../component/AuthLayout';

const BASE_URL = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', email);

      const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!result.error) {
        setSnackbar({
          open: true,
          message: result.message || 'If your email exists, a reset link has been sent.',
          severity: 'success',
        });
        setEmail('');
      } else {
        setSnackbar({
          open: true,
          message: result.message || 'Something went wrong.',
          severity: 'error',
        });
      }

    } catch (error) {
      console.error('Forgot password error:', error);
      setSnackbar({
        open: true,
        message: 'Network error. Please try again later.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <AuthLayout>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Forgot Password?
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your email address and we’ll send you a link to reset your password.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 1 }}>
                <Email color="action" />
              </Box>
            )
          }}
          margin="normal"
        />

        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          disabled={loading}
          sx={{ mt: 2, backgroundColor: '#068a06', '&:hover': { backgroundColor: '#057a05' } }}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthLayout>
  );
};

export default ForgotPassword;
