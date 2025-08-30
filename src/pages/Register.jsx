import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
} from '@mui/icons-material';
import AuthLayout from '../component/AuthLayout';

const BASE_URL = process.env.REACT_APP_API_URL;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, password } = formData;

    try {
      const response = await fetch(`${BASE_URL}/api/auth/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // ✅ tell backend we’re sending JSON
        },
        body: JSON.stringify({
          fullname: fullName, // ✅ match backend field name
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!result.error) {
        setSnackbar({
          open: true,
          message: 'Registration successful!',
          severity: 'success',
        });
        setTimeout(() => {
          window.location.href = '/signin';
        }, 2000);
      } else {
        setSnackbar({
          open: true,
          message: result.message || 'Something went wrong.',
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Network or server error:', error);
      setSnackbar({
        open: true,
        message: 'Network error, please try again later.',
        severity: 'error',
      });
    }
  };

  return (
    <AuthLayout>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700, color: '#068a06' }}
      >
        Create Account
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Join thousands of fans traveling to AFCON Morocco 2026
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person color="action" />
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          required
        />

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

        <Button
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          sx={{
            mt: 3,
            mb: 2,
            py: 1.5,
            backgroundColor: '#068a06',
            '&:hover': {
              backgroundColor: '#057a05',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Sign Up
        </Button>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Typography variant="body2" sx={{ mt: 3 }}>
          Already have an account?{' '}
          <Link href="/signin" color="#068a06" underline="hover">
            Sign In
          </Link>
        </Typography>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthLayout>
  );
};

export default SignUp;
