import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Link, 
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Divider,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Email,
  Lock
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../component/AuthLayout';
import { useAuth } from '../context/AuthContext';

const BASE_URL = process.env.REACT_APP_API_URL;

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const { login } = useAuth(); // ✅ use AuthContext
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/auth/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!result.error && result.token && result._id) {
        login({ _id: result._id, fullname: result.fullname, email: result.email }, result.token);

        setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });

        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setSnackbar({ open: true, message: result.message || 'Login failed.', severity: 'error' });
      }
    } catch (error) {
      console.error('Network error:', error);
      setSnackbar({ open: true, message: 'Network error, please try again.', severity: 'error' });
    }
  };
  
  return (
    <AuthLayout>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#068a06' }}>
        Welcome Back
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Sign in to manage your AFCON 2026 bookings
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          required
        />

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 2
        }}>
          <FormControlLabel
            control={
              <Checkbox 
                name="remember" 
                checked={formData.remember}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Link href="/forgot-password" color="#068a06" underline="hover">
            Forgot password?
          </Link>
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          sx={{
            mt: 1,
            mb: 2,
            py: 1.5,
            backgroundColor: '#068a06',
            '&:hover': {
              backgroundColor: '#057a05',
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Sign In
        </Button>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
          Don't have an account? <Link href="/signup" color="#068a06" underline="hover">Sign Up</Link>
        </Typography>
      </form>

      {/* Snackbar */}
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

export default SignIn;
