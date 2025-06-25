import React from 'react';
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
  List
} from '@mui/material';
import { Star, CheckCircle } from '@mui/icons-material';

export default function Tickets() {
  const theme = useTheme();
  const primaryColor = "#046f04";

  const tickets = [
    {
      type: "VIP",
      price: "$499",
      description: "Premium seating, lounge access, exclusive merchandise, and meet & greet opportunities",
      features: [
        "Best seats in stadium",
        "VIP lounge access",
        "Free official merchandise",
        "Meet & greet with players"
      ],
      popular: true
    },
    {
      type: "Regular",
      price: "$199",
      description: "Great view of the pitch with standard stadium amenities",
      features: [
        "Good seating location",
        "Stadium amenities",
        "Food & beverage access"
      ]
    },
    {
      type: "Economy",
      price: "$99",
      description: "Affordable option with basic stadium access",
      features: [
        "Standard seating",
        "Basic stadium access",
        "Concession stands available"
      ]
    }
  ];

  return (
    <Box sx={{ 
      py: 8, mt: 3,
      backgroundColor: theme.palette.background.default
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
          Match Tickets
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {tickets.map((ticket, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',

                  display: 'flex',
                  flexDirection: 'column',
                  border: ticket.popular ? `2px solid ${primaryColor}` : 'none',
                  position: 'relative',
                  transform: ticket.popular ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: ticket.popular ? 'scale(1.05)' : 'scale(1.03)',
                    boxShadow: theme.shadows[6]
                  }
                }}
                elevation={3}
              >
                {ticket.popular && (
                  <Chip
                    icon={<Star />}
                    label="Premium"
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      fontWeight: 'bold'
                    }}
                  />
                )}
                
                <CardContent sx={{ 
                  flexGrow: 1,
                  p: 4,
                  backgroundColor: ticket.popular ? `${primaryColor}08` : 'inherit'
                }}>
                  <Typography 
                    variant="h4" 
                    component="h3"
                    align="center"
                    gutterBottom
                    sx={{ 
                      fontWeight: 700,
                      color: ticket.popular ? primaryColor : 'inherit',
                      mb: 2
                    }}
                  >
                    {ticket.type}
                  </Typography>
                  
                  <Typography 
                    variant="h3" 
                    align="center"
                    gutterBottom
                    sx={{ 
                      fontWeight: 'bold',
                      color: primaryColor,
                      mb: 3
                    }}
                  >
                    {ticket.price}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    align="center"
                    sx={{ 
                      mb: 3,
                      minHeight: '60px'
                    }}
                  >
                    {ticket.description}
                  </Typography>
                  
                  <List sx={{ mb: 3 }}>
                    {ticket.features.map((feature, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CheckCircle 
                          fontSize="small" 
                          sx={{ 
                            color: primaryColor,
                            mr: 1
                          }} 
                        />
                        <Typography variant="body2">{feature}</Typography>
                      </Box>
                    ))}
                  </List>
                  
                  <Button
                    variant={ticket.popular ? "contained" : "outlined"}
                    fullWidth
                    size="large"
                    sx={{
                      mt: 2,
                      backgroundColor: ticket.popular ? primaryColor : 'transparent',
                      color: ticket.popular ? 'white' : primaryColor,
                      borderColor: primaryColor,
                      '&:hover': {
                        backgroundColor: ticket.popular ? `${primaryColor}90` : `${primaryColor}10`
                      }
                    }}
                  >
                    Select Ticket
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
