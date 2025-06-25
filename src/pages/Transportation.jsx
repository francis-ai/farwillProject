import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Box, 
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  AirplanemodeActive,
  DirectionsBus,
  Train,
  DirectionsBoat,
  CheckCircle
} from '@mui/icons-material';

export default function Transportation() {
  const primaryColor = "#046f04";

  const airlines = [
    {
      name: 'Royal Air Maroc',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Royal_Air_Maroc_logo.svg/1200px-Royal_Air_Maroc_logo.svg.png',
      classes: ['Economy', 'Business', 'First Class'],
      routes: ['Lagos (LOS)', 'Abuja (ABV)', 'Accra (ACC)', 'Dakar (DKR)']
    },
    {
      name: 'Air France',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/AirFrance_logo.svg/1200px-AirFrance_logo.svg.png',
      classes: ['Economy', 'Premium Economy', 'Business'],
      routes: ['Lagos (LOS)', 'Abuja (ABV)', 'Johannesburg (JNB)']
    },
    {
      name: 'Ethiopian Airlines',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Ethiopian_Airlines_Logo.svg/1200px-Ethiopian_Airlines_Logo.svg.png',
      classes: ['Economy', 'Business'],
      routes: ['Lagos (LOS)', 'Nairobi (NBO)', 'Addis Ababa (ADD)']
    }
  ];

  const groundTransport = [
    {
      type: 'Inter-City Trains',
      icon: <Train color="primary" />,
      description: 'Comfortable rail connections between major Moroccan cities hosting AFCON matches'
    },
    {
      type: 'Stadium Shuttles',
      icon: <DirectionsBus color="primary" />,
      description: 'Dedicated buses running between hotels and stadiums on match days'
    },
    {
      type: 'Ferry Services',
      icon: <DirectionsBoat color="primary" />,
      description: 'Sea connections from Spain (for European travelers coming via Gibraltar)'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8, mt: 3 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: primaryColor,
          mb: 2,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontSize: { xs: '1.5rem', sm: '2.0rem', md: '2.5rem' },
          textAlign: 'center',
          '&::after': {
            content: '""',
            display: 'block',
            margin: '8px auto 0',
            width: '60px',
            height: '4px',
            backgroundColor: primaryColor,
            borderRadius: 2,
          }
        }}
      >
        Mode of Transportation
      </Typography>

      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Official Airline Partners
      </Typography>
      <Typography variant="body1" sx={{ mb: 6, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
        We've partnered with leading airlines to bring you seamless travel to Morocco. 
        Choose from multiple cabin classes to suit your budget and preferences.
      </Typography>

      <Grid container spacing={6} sx={{ mb: 8 }}>
        {airlines.map((airline, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', width: '345px', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="120"
                image={airline.logo}
                alt={airline.name}
                sx={{ objectFit: 'contain', p: 3, backgroundColor: '#f8f9fa' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3" sx={{ textAlign: 'center' }}>
                  {airline.name}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Available Classes:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {airline.classes.map((cls, i) => (
                      <Chip 
                        key={i} 
                        label={cls} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Major Routes:</Typography>
                  <List dense>
                    {airline.routes.map((route, i) => (
                      <ListItem key={i} sx={{ py: 0 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <AirplanemodeActive color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={`To Casablanca (CMN) from ${route}`} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Ground Transportation in Morocco
      </Typography>
      <Typography variant="body1" sx={{ mb: 6, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
        Once you arrive in Morocco, we offer various transportation options to get you to your accommodation and stadiums.
      </Typography>

      <Grid container spacing={6}>
        {groundTransport.map((transport, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box sx={{ 
              p: 3, 
              height: '100%',
              width: '300px',
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }
            }}>
              <Box sx={{ 
                width: 60, 
                height: 60, 
                backgroundColor: 'rgba(4, 111, 4, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                {transport.icon}
              </Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {transport.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {transport.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ 
        mt: 8,
        p: 4,
        backgroundColor: 'rgba(4, 111, 4, 0.05)',
        borderRadius: 2,
        borderLeft: '4px solid #046f04'
      }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#046f04' }}>
          Important Travel Notes:
        </Typography>
        <List>
          <ListItem sx={{ py: 0 }}>
            <ListItemIcon sx={{ minWidth: 30 }}>
              <CheckCircle color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="All international travelers must have a valid passport with at least 6 months validity" />
          </ListItem>
          <ListItem sx={{ py: 0 }}>
            <ListItemIcon sx={{ minWidth: 30 }}>
              <CheckCircle color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Visa requirements vary by nationality - check with the Moroccan consulate" />
          </ListItem>
          <ListItem sx={{ py: 0 }}>
            <ListItemIcon sx={{ minWidth: 30 }}>
              <CheckCircle color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Book early as flights and ground transportation fill up quickly during AFCON" />
          </ListItem>
          <ListItem sx={{ py: 0 }}>
            <ListItemIcon sx={{ minWidth: 30 }}>
              <CheckCircle color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Our team can assist with airport transfers - inquire when booking your package" />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};
