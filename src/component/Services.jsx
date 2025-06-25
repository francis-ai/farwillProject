import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  Container
} from '@mui/material';
import {
  Flight,
  Hotel,
  ConfirmationNumber,
  Person,
  Payment,
  Schedule
} from '@mui/icons-material';

const Services = () => {
  const theme = useTheme();
  const primaryColor = "#046f04";

  const services = [
    {
      title: "Transportation",
      icon: <Flight fontSize="large" />,
      description: "Book flights and shuttle services to all AFCON venues across Morocco. We offer seamless transfers between cities and stadiums.",
      action: "Explore Options"
    },
    {
      title: "Accommodation",
      icon: <Hotel fontSize="large" />,
      description: "Find the perfect stay near match venues. Choose from luxury hotels, apartments, and fan villages at competitive prices.",
      action: "Find Stays"
    },
    {
      title: "Event Tickets",
      icon: <ConfirmationNumber fontSize="large" />,
      description: "Secure official match tickets for all AFCON games. Get access to premium seating and exclusive fan experiences.",
      action: "Get Tickets"
    },
    {
      title: "User Management",
      icon: <Person fontSize="large" />,
      description: "Create your profile, manage bookings, and access exclusive member benefits. One account for all your AFCON needs.",
      action: "Create Account"
    },
    {
      title: "Secure Payments",
      icon: <Payment fontSize="large" />,
      description: "Our encrypted payment system ensures your transactions are safe. Multiple payment options including cards, mobile money, and bank transfers.",
      action: "Learn More"
    },
    {
      title: "Itinerary Management",
      icon: <Schedule fontSize="large" />,
      description: "Create personalized schedules with match times, transportation details, accommodation info, and local attractions.",
      action: "Plan Your Trip"
    }
  ];

  return (
    <Box sx={{ 
      py: 8,
      backgroundColor: theme.palette.background.paper
    }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            color: primaryColor,
            mb: 6,
            position: 'relative',
            '&:after': {
              content: '""',
              display: 'block',
              width: '80px',
              height: '4px',
              backgroundColor: primaryColor,
              margin: '16px auto 0',
              borderRadius: '2px'
            }
          }}
        >
          Our Services
        </Typography>
        
        <Grid container spacing={6}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  width: '345px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 10px 20px rgba(0, 0, 0, 0.1)`
                  }
                }}
                elevation={3}
              >
                <CardContent sx={{ 
                  flexGrow: 1,
                  textAlign: 'center',
                  p: 4
                }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      margin: '0 auto 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: `${primaryColor}20`,
                      borderRadius: '50%',
                      color: primaryColor
                    }}
                  >
                    {service.icon}
                  </Box>
                  
                  <Typography 
                    variant="h5" 
                    component="h3"
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      mb: 2
                    }}
                  >
                    {service.title}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      mb: 3,
                      minHeight: '72px'
                    }}
                  >
                    {service.description}
                  </Typography>
                  
                  <Button
                    variant="outlined"
                    size="medium"
                    sx={{
                      borderColor: primaryColor,
                      color: primaryColor,
                      '&:hover': {
                        backgroundColor: `${primaryColor}10`,
                        borderColor: primaryColor
                      }
                    }}
                  >
                    {service.action}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;