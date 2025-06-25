import React from 'react';
import DashboardLayout from '../../component/Dashboard/DashboardLayout';
import { 
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  Chip,
  Box,
  Paper
} from '@mui/material';
import { Star, StarBorder, KingBed } from '@mui/icons-material';

// Mock data - replace with your actual data
const userReservation = {
  booked: true,
  hotel: {
    name: 'Radisson Blu Hotel, Abidjan',
    image: 'https://source.unsplash.com/random/800x600/?hotel',
    stars: 5,
    room: 'Deluxe Suite (Room 421)',
    checkIn: '2025-01-10',
    checkOut: '2025-01-20',
    amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Breakfast Included']
  }
};

const renderStars = (count) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {[...Array(5)].map((_, i) => (
        i < count ? 
          <Star key={i} sx={{ color: '#FFD700', fontSize: '1.2rem' }} /> : 
          <StarBorder key={i} sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
      ))}
      <Typography variant="body2" sx={{ ml: 1 }}>({count} star)</Typography>
    </Box>
  );
};

export default function MyReservation() {
  return (
    <DashboardLayout>
      <Container maxWidth="md" sx={{ py: 4, mt: 5 }}>
        <Typography variant="h4" sx={{ 
          mb: 3,
          fontWeight: 'bold',
          color: '#068a06'
        }}>
          My Accommodation
        </Typography>

        {userReservation.booked ? (
          <>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Your Current Reservation
            </Typography>
            
            <Card sx={{ mb: 4, p: 4 }}>
              <Grid container>
                <Grid item xs={12} md={4}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={userReservation.hotel.image}
                    alt={userReservation.hotel.name}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h5" component="div">
                        {userReservation.hotel.name}
                      </Typography>
                      {renderStars(userReservation.hotel.stars)}
                    </Box>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                      <KingBed sx={{ verticalAlign: 'middle', mr: 1 }} />
                      {userReservation.hotel.room}
                    </Typography>
                    
                    <Box sx={{ mt: 2, mb: 3 }}>
                      <Chip label={`Check-in: ${userReservation.hotel.checkIn}`} sx={{ mr: 1 }} />
                      <Chip label={`Check-out: ${userReservation.hotel.checkOut}`} />
                    </Box>
                    
                    <Typography variant="body1" sx={{ mb: 1 }}>Amenities:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {userReservation.hotel.amenities.map((amenity, index) => (
                        <Chip key={index} label={amenity} size="small" />
                      ))}
                    </Box>
                    
                    <Button 
                      variant="contained" 
                      sx={{ 
                        mt: 'auto',
                        alignSelf: 'flex-start',
                        backgroundColor: '#068a06',
                        '&:hover': { backgroundColor: '#056a05' }
                      }}
                    >
                      Modify Reservation
                    </Button>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
            
            <Divider sx={{ my: 4 }} />
          </>
        ) : (
          <Paper elevation={3} sx={{ p: 3, mb: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              You haven't booked any accommodation yet
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                backgroundColor: '#068a06',
                '&:hover': { backgroundColor: '#056a05' }
              }}
            >
              Book Reservation Now
            </Button>
          </Paper>
        )}
      </Container>
    </DashboardLayout>
  );
}