import React, { forwardRef, useState, useEffect } from 'react';
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

const BASE_URL = process.env.REACT_APP_API_URL;

const Packages = forwardRef((props, ref) => {
  const theme = useTheme();
  const primaryColor = "#046f04";
  const [apiPackages, setApiPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/packages`);
        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.message);
        }
        setApiPackages(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Map API data to your expected format
  const packages = apiPackages.map((pkg) => ({
    name: pkg.name,
    price: `$${pkg.price}`,
    description: pkg.type === 'silver' ? "Basic package for starters" :
               pkg.type === 'gold' ? "Popular choice for fans" :
               "Ultimate fan experience",
    color: pkg.type === 'silver' ? theme.palette.grey[400] : 
           pkg.type === 'gold' ? theme.palette.warning.main : 
           primaryColor,
    benefits: pkg.benefits,
    popular: pkg.type === 'gold' // Mark gold package as popular
  }));

  if (loading) {
    return (
      <Box ref={ref} component="section" sx={{ py: 8, px: 2, textAlign: 'center' }}>
        <Typography variant="h6">Loading packages...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box ref={ref} component="section" sx={{ py: 8, px: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="error">Error: {error}</Typography>
      </Box>
    );
  }

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
                      <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                        {benefit}
                      </Typography>
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

Packages.displayName = 'Packages';

export default Packages;