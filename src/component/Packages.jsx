import React, { forwardRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  useTheme
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const Packages = forwardRef((props, ref) => {
  const theme = useTheme();
  const primaryColor = "#046f04";

  const packages = [
    {
      name: "Silver",
      price: "$2,999",
      description: "Basic package for starters",
      color: theme.palette.grey[400],
      benefits: [
        "5 Match Tickets",
        "Basic Seat Selection",
        "Email Support",
        "Event Newsletter"
      ]
    },
    {
      name: "Gold",
      price: "$3.999",
      description: "Popular choice for fans",
      color: theme.palette.warning.main,
      benefits: [
        "10 Match Tickets",
        "Premium Seat Selection",
        "Priority Support",
        "Exclusive Merch Discount",
        "VIP Lounge Access (1 match)"
      ],
      popular: true
    },
    {
      name: "Platinum",
      price: "$5,999",
      description: "Ultimate fan experience",
      color: primaryColor,
      benefits: [
        "All Match Tickets",
        "Best Seat Selection",
        "24/7 Dedicated Support",
        "Free Official Merchandise",
        "VIP Lounge Access (All matches)",
        "Meet & Greet Opportunity"
      ]
    }
  ];

  return (
    <Box 
      ref={ref} 
      component="section" 
      sx={{ py: 8, px: 2, backgroundColor: theme.palette.background.default }}
    >
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
        Our Packages
      </Typography>
      
      <Grid container spacing={4} justifyContent="center">
        {packages.map((pkg, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card 
              elevation={pkg.popular ? 6 : 3} 
              sx={{ 
                height: '100%',
                width: '345px',
                display: 'flex',
                flexDirection: 'column',
                border: pkg.popular ? `2px solid ${primaryColor}` : 'none',
                position: 'relative'
              }}
            >
              {pkg.popular && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 16,
                    backgroundColor: primaryColor,
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: '0 0 4px 4px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}
                >
                  POPULAR
                </Box>
              )}
              
              <CardHeader
                title={pkg.name}
                subheader={pkg.description}
                titleTypographyProps={{
                  variant: 'h4',
                  align: 'center',
                  color: 'common.white'
                }}
                subheaderTypographyProps={{
                  align: 'center',
                  color: 'common.white'
                }}
                sx={{
                  backgroundColor: pkg.color,
                  py: 3,
                  color: 'common.white'
                }}
              />
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h3" 
                  align="center" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    color: primaryColor,
                    my: 2
                  }}
                >
                  {pkg.price}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <List>
                  {pkg.benefits.map((benefit, i) => (
                    <ListItem key={i} disableGutters>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <Typography variant="body1">{benefit}</Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    backgroundColor: primaryColor,
                    '&:hover': {
                      backgroundColor: theme.palette.success.dark
                    },
                    fontWeight: 'bold',
                    py: 1.5
                  }}
                >
                  Select Package
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

Packages.displayName = 'Packages'; // This helps with debugging

export default Packages;