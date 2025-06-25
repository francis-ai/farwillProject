import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Button, 
  TextField,
  Grid,
  Chip, Stack
} from '@mui/material';
import {
  Email,
  Phone,
  Schedule,
  CheckCircle,
  Forum,
} from '@mui/icons-material';
import DashboardLayout from '../../component/Dashboard/DashboardLayout';

const Support = () => {
  const [message, setMessage] = useState('');

  const contactMethods = [
    { 
      icon: <Email color="primary" sx={{ fontSize: 40 }} />,
      title: "Email Support",
      description: "Get a response within 24 hours",
      action: "support@afcon2025.com",
      buttonText: "Send Email"
    },
    { 
      icon: <Phone color="primary" sx={{ fontSize: 40 }} />,
      title: "Phone Support",
      description: "24/7 helpline for urgent issues",
      action: "+1 (234) 567-8910",
      buttonText: "Call Now"
    },
  ];

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4, mt: 5 }}>
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" sx={{ 
            fontWeight: 700,
            color: '#046f04',
            mb: 2
          }}>
            Support Center
          </Typography>
          <Typography variant="h6" color="text.secondary">
            We're here to help with any questions about your AFCON 2025 experience
          </Typography>
        </Box>

        {/* Contact Form */}
        <Card sx={{ 
            borderRadius: 3,
            boxShadow: 3,
            mb: 4,
            borderLeft: '4px solid #046f04'
            }}>
            <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ 
                fontWeight: 600,
                mb: 4,
                color: '#046f04',
                display: 'flex',
                alignItems: 'center',
                gap: 2
                }}>
                <Schedule color="primary" />
                Send Us a Message
                </Typography>
                
                <Box component="form" sx={{ width: '100%' }}>
                <Stack spacing={3}>
                    <TextField
                    fullWidth
                    label="Your Name"
                    variant="outlined"
                    size="medium"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                        }
                    }}
                    />

                    <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    size="medium"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                        }
                    }}
                    />

                    <TextField
                    fullWidth
                    label="Subject"
                    variant="outlined"
                    size="medium"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                        }
                    }}
                    />

                    <TextField
                    fullWidth
                    multiline
                    rows={5}
                    label="Your Message"
                    variant="outlined"
                    size="medium"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        alignItems: 'flex-start'
                        }
                    }}
                    />

                    <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    mt: 2
                    }}>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                        backgroundColor: '#046f04',
                        '&:hover': { backgroundColor: '#035a03' },
                        px: 5,
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: '1rem',
                        fontWeight: 600
                        }}
                    >
                        Send Message
                    </Button>
                    </Box>
                </Stack>
                </Box>
            </CardContent>
        </Card>

        {/* Contact Methods */}
        <Typography variant="h5" sx={{ 
          fontWeight: 600,
          mb: 3,
          color: '#046f04',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Forum color="primary" />
          Contact Options
        </Typography>

        <Grid container spacing={3} mb={6}>
          {contactMethods.map((method, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: 3
              }}>
                <CardContent sx={{ 
                  p: 4,
                  flexGrow: 1,
                  textAlign: 'center'
                }}>
                  <Box sx={{ mb: 2 }}>
                    {method.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {method.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {method.description}
                  </Typography>
                  <Chip 
                    label={method.action}
                    sx={{ 
                      mb: 3,
                      backgroundColor: '#046f0410',
                      color: '#046f04',
                      fontWeight: 500
                    }}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: '#046f04',
                      '&:hover': { backgroundColor: '#035a03' }
                    }}
                  >
                    {method.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        

        {/* Support Status */}
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 3,
          backgroundColor: '#f5f5f5',
          borderRadius: 2
        }}>
          <CheckCircle color="success" />
          <Typography variant="body2">
            <strong>Current support status:</strong> All systems operational. Average response time: 2 hours.
          </Typography>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default Support;