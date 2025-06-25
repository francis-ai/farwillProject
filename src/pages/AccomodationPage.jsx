import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  Container,
  Chip,
  Divider,
  IconButton
} from '@mui/material';
import {
  LocationOn,
  Star,
  Wifi,
  Pool,
  Restaurant,
  FitnessCenter,
  LocalParking,
  Spa,
  ArrowBackIos,
  ArrowForwardIos
} from '@mui/icons-material';


export default function AccommodationPage() {
  const theme = useTheme();
  const primaryColor = "#046f04";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample hotel data
  const hotel = {
    name: "Royal Marrakech Resort",
    rating: 4.8,
    location: "Central Marrakech, 2km from Stadium",
    description: "Luxurious 5-star accommodation with premium amenities and stunning views of the Atlas Mountains. Perfect for football fans seeking comfort and convenience during AFCON 2025.",
    price: "$320/night",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    ],
    services: [
      { name: "Free WiFi", icon: <Wifi /> },
      { name: "Swimming Pool", icon: <Pool /> },
      { name: "Restaurant", icon: <Restaurant /> },
      { name: "Fitness Center", icon: <FitnessCenter /> },
      { name: "Free Parking", icon: <LocalParking /> },
      { name: "Spa", icon: <Spa /> }
    ],
    amenities: [
      "24-hour front desk",
      "Air conditioning",
      "Daily housekeeping",
      "Airport shuttle",
      "Business center",
      "Concierge service"
    ]
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === hotel.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? hotel.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box sx={{ 
      py: 4, mt: 7,
      backgroundColor: theme.palette.background.default
    }}>
      <Container maxWidth="lg">
        {/* Image Carousel */}
        <Box sx={{ 
          position: 'relative',
          mb: 4,
          borderRadius: 2,
          overflow: 'hidden',
          height: { xs: 300, md: 400 }
        }}>
          <Box
            component="img"
            src={`${hotel.images[currentImageIndex]}?auto=format&fit=crop&w=1200&h=400`}
            alt={hotel.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)'
              }
            }}
          >
            <ArrowBackIos />
          </IconButton>
          
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)'
              }
            }}
          >
            <ArrowForwardIos />
          </IconButton>
          
          <Box sx={{
            position: 'absolute',
            bottom: 16,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 1
          }}>
            {hotel.images.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: index === currentImageIndex ? primaryColor : 'rgba(255,255,255,0.5)'
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Thumbnail Gallery */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {hotel.images.slice(0, 4).map((image, index) => (
            <Grid item xs={6} md={3} key={index}> {/* Changed sm to md */}
              <Box
                component="img"
                src={`${image}?auto=format&fit=crop&w=300&h=200`}
                alt={`Hotel view ${index + 1}`}
                sx={{
                  width: '100%',
                  height: { xs: 100, sm: 150 }, // Adjusted height for mobile
                  objectFit: 'cover',
                  borderRadius: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
                onClick={() => setCurrentImageIndex(index)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Hotel Details */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography 
              variant="h3" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                color: primaryColor
              }}
            >
              {hotel.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Star sx={{ color: '#ffc107', mr: 1 }} />
              <Typography variant="h6" sx={{ mr: 2 }}>
                {hotel.rating}
              </Typography>
              <LocationOn sx={{ color: primaryColor, mr: 1 }} />
              <Typography variant="body1">
                {hotel.location}
              </Typography>
            </Box>
            
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              {hotel.description}
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Amenities
            </Typography>
            
            <Grid container spacing={1} sx={{ mb: 3 }}>
              {hotel.amenities.map((amenity, index) => (
                <Grid item key={index}>
                  <Chip
                    label={amenity}
                    sx={{
                      backgroundColor: `${primaryColor}10`,
                      color: 'text.primary'
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ position: 'sticky', top: 16 }}>
                <CardContent sx={{ p: 3 }}>
                <Typography 
                    variant="h4" 
                    gutterBottom
                    sx={{ 
                    fontWeight: 'bold',
                    color: primaryColor
                    }}
                >
                    {hotel.price}
                </Typography>
                
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Services Included
                </Typography>
                
                <Box sx={{ 
                    mb: 3,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1
                }}>
                    {hotel.services.map((service, index) => (
                    <Chip
                        key={index}
                        icon={service.icon}
                        label={service.name}
                        sx={{
                        backgroundColor: `${primaryColor}10`,
                        color: 'text.primary',
                        '& .MuiChip-icon': {
                            color: primaryColor,
                            fontSize: '1rem',
                            marginLeft: '8px'
                        },
                        '&:hover': {
                            backgroundColor: `${primaryColor}20`
                        }
                        }}
                    />
                    ))}
                </Box>
                
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                    backgroundColor: primaryColor,
                    '&:hover': {
                        backgroundColor: `${primaryColor}90`
                    },
                    py: 1.5,
                    fontWeight: 'bold',
                    mt: 2
                    }}
                >
                    Book Now
                </Button>
                </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
