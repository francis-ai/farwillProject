import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  Grid,
} from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';
import hero from '../assets/images/Hero.jpeg';

export default function Hero({ scrollToPackages })  {
  // AFCON Morocco 2025 start date (example: June 15, 2025)
  const targetDate = new Date('2025-12-15T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = targetDate - new Date().getTime();
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(difference / (1000 * 60 * 60)) % 24,
      minutes: Math.floor((difference / 1000 / 60)) % 60,
      seconds: Math.floor((difference / 1000)) % 60
    };
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        minHeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        backgroundImage: `linear-gradient(rgba(34, 30, 30, 0.85), rgba(21, 22, 21, 0.83)), url(${hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        textAlign: 'center',
        px: 2
      }}
    >
      <Container maxWidth="lg">
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Typography 
              variant="h1" 
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.0rem' },
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                mb: 3
              }}
            >
              EXPERIENCE AFCON <br></br>MOROCCO 2025
            </Typography>
            
            <Typography 
              variant="h5" 
              component="h2"
              sx={{
                mb: 4,
                fontWeight: 400,
                textShadow: '0 1px 3px rgba(0,0,0,0.5)'
              }}
            >
              Premium travel packages for the ultimate football experience in Morocco
            </Typography>
            
            {/* Countdown Timer Box */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Grid container spacing={2} justifyContent="center">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                    <Grid item key={unit} xs={6} sm={3}>
                        <Box
                        sx={{
                            p: 2,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: 2,
                            minWidth: 95
                        }}
                        >
                        <Typography 
                            variant="h3" 
                            sx={{ 
                            fontWeight: 'bold',
                            color: 'white'
                            }}
                        >
                            {value.toString().padStart(2, '0')}
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                            textTransform: 'uppercase',
                            color: 'white',
                            opacity: 0.8,
                            fontSize: { xs: '0.75rem', sm: '0.85rem' }
                            }}
                        >
                            {unit}
                        </Typography>
                        </Box>
                    </Grid>
                    ))}
                </Grid>
            </Box>
            
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowDownward />}
              onClick={scrollToPackages}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                backgroundColor: '#046f04',
                '&:hover': {
                  backgroundColor: '#035a03',
                  transform: 'translateY(2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Explore Packages
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

