import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Button, 
  Tabs,
  Tab,
  Box
} from '@mui/material';
import { Star } from '@mui/icons-material';

export default function Accommodation() {
  const [tabValue, setTabValue] = useState(0);
  const primaryColor = "#046f04";

  const hotels = {
    fiveStar: [
      {
        id: 1,
        name: 'Royal Mansour Marrakech',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        price: '$450/night',
        amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi']
      },
      {
        id: 2,
        name: 'Four Seasons Resort Marrakech',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        price: '$400/night',
        amenities: ['Pool', 'Spa', 'Beach Access', 'Free WiFi']
      },
      {
        id: 3,
        name: 'La Mamounia',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        price: '$380/night',
        amenities: ['Pool', 'Spa', 'Golf Course', 'Free WiFi']
      },
    ],
    fourStar: [
      {
        id: 4,
        name: 'Sofitel Casablanca',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        price: '$220/night',
        amenities: ['Restaurant', 'Gym', 'Free WiFi']
      },
      {
        id: 5,
        name: 'Hyatt Regency Casablanca',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        price: '$200/night',
        amenities: ['Pool', 'Restaurant', 'Free WiFi']
      },
      {
        id: 6,
        name: 'Kenzi Tower Hotel',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        price: '$180/night',
        amenities: ['Restaurant', 'Bar', 'Free WiFi']
      },
    ],
    threeStar: [
      {
        id: 7,
        name: 'Ibis Casablanca City Center',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        price: '$120/night',
        amenities: ['Restaurant', 'Free WiFi']
      },
      {
        id: 8,
        name: 'Hotel Farah Casablanca',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        price: '$100/night',
        amenities: ['Breakfast', 'Free WiFi']
      },
      {
        id: 9,
        name: 'Atlas Sky Airport Hotel',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        price: '$90/night',
        amenities: ['Airport Shuttle', 'Free WiFi']
      },
    ]
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
        AFCON 2025 Accommodations
      </Typography>

      <Tabs 
        value={tabValue} 
        onChange={handleTabChange} 
        centered
        sx={{ mb: 4 }}
      >
        <Tab label="5-Star" icon={<Star />} iconPosition="start" />
        <Tab label="4-Star" icon={<Star />} iconPosition="start" />
        <Tab label="3-Star" icon={<Star />} iconPosition="start" />
      </Tabs>

      {/* Five Star Hotels */}
      <Box sx={{ display: tabValue === 0 ? 'block' : 'none' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Luxury 5-Star Hotels
        </Typography>
        <Grid container spacing={6}>
          {hotels.fiveStar.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.id}>
              <Card sx={{ height: '100%', width: '345px', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={hotel.image}
                  alt={hotel.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {hotel.name}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
                    ))}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {hotel.amenities.join(' • ')}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {hotel.price}
                  </Typography>
                </CardContent>
                <Button
                  component={Link}
                  to="/accomodation-page"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#046f04',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#035a03'
                    }
                  }}
                >
                  View Availability
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Four Star Hotels */}
      <Box sx={{ display: tabValue === 1 ? 'block' : 'none' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Comfortable 4-Star Hotels
        </Typography>
        <Grid container spacing={6}>
          {hotels.fourStar.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.id}>
              <Card sx={{ height: '100%', width: '345px', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={hotel.image}
                  alt={hotel.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {hotel.name}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
                    ))}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {hotel.amenities.join(' • ')}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {hotel.price}
                  </Typography>
                </CardContent>
                <Button
                  component={Link}
                  to="/accomodation-page"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#046f04',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#035a03'
                    }
                  }}
                >
                  View Availability
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Three Star Hotels */}
      <Box sx={{ display: tabValue === 2 ? 'block' : 'none' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Affordable 3-Star Hotels
        </Typography>
        <Grid container spacing={6}>
          {hotels.threeStar.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.id}>
              <Card sx={{ height: '100%', width: '345px', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={hotel.image}
                  alt={hotel.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {hotel.name}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
                    ))}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {hotel.amenities.join(' • ')}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {hotel.price}
                  </Typography>
                </CardContent>
                <Button
                  component={Link}
                  to="/accomodation-page"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#046f04',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#035a03'
                    }
                  }}
                >
                  View Availability
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

