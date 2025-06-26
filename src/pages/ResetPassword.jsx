import { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Snackbar, 
  Alert, 
  InputAdornment, 
  IconButton 
} from '@mui/material';
import { Visibility, VisibilityOff, Lock } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../component/AuthLayout';

const BASE_URL = process.env.REACT_APP_API_URL;

const ResetPassword = () => {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token and email from URL query string
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get('email');
    const tokenParam = queryParams.get('token');

    if (emailParam && tokenParam) {
      setEmail(emailParam);
      setToken(tokenParam);
    } else {
      setSnackbar({ open: true, message: 'Invalid or missing reset credentials.', severity: 'error' });

      // Delay before redirecting to allow snackbar to briefly show
      setTimeout(() => {
        navigate('/signin');
      }, 1500);
    }
  }, [location.search, navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setSnackbar({ open: true, message: 'Passwords do not match.', severity: 'error' });
    }

    try {
      const payload = new FormData();
      payload.append('email', email);
      payload.append('token', token);
      payload.append('password', formData.password);
      payload.append('password_confirmation', formData.confirmPassword);

      const response = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: 'POST',
        body: payload
      });

      const result = await response.json();

      if (!result.error) {
        setSnackbar({ open: true, message: result.message || 'Password reset successfully.', severity: 'success' });
        setTimeout(() => navigate('/signin'), 2000);
      } else {
        setSnackbar({ open: true, message: result.message || 'Reset failed.', severity: 'error' });
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setSnackbar({ open: true, message: 'Network error. Please try again.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <AuthLayout>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Reset Password
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your new password below.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="New Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          margin="normal"
          required
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          label="Confirm New Password"
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          margin="normal"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            )
          }}
        />

        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          sx={{ mt: 2, backgroundColor: '#068a06', '&:hover': { backgroundColor: '#057a05' } }}
        >
          Reset Password
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

export default ResetPassword;
