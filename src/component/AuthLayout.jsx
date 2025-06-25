import { Box, Container, Typography } from '@mui/material';
import { SportsSoccer } from '@mui/icons-material';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Container maxWidth="sm" sx={{mt: 9}}>
        <Box sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          p: { xs: 3, md: 6 },
          boxShadow: 3,
          textAlign: 'center'
        }}>
          {/* Logo Section */}
          <SportsSoccer sx={{
            fontSize: 50,
            color: '#068a06',
            mb: 1
          }} />
          <Typography variant="h4" sx={{ 
            fontWeight: 700, 
            color: '#068a06',
            mb: 1
          }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ 
            color: 'text.secondary',
            mb: 4
          }}>
            {subtitle}
          </Typography>
          
          {/* Child Components (SignIn/SignUp forms) */}
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;