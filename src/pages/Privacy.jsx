import { Container, Typography, Box } from '@mui/material';


const Privacy = () => {
    const primaryColor = "#046f04";

  return (
    <Container maxWidth="md" sx={{ py: 6, mt: 5 }}>
      <Box textAlign="center" mb={6}>
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
          Privacy Policy
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Last updated: June 2025
        </Typography>
      </Box>

      <Box sx={{ '& h4': { mt: 4, mb: 2, color: '#046f04', fontWeight: 'bold' }, '& p': { mb: 2 } }}>
        <Typography variant="h4">Information We Collect</Typography>
        <Typography>
          We collect personal information when you create an account, make purchases, or contact support. This includes name, email, payment details, and preferences.
        </Typography>

        <Typography variant="h4">How We Use Your Data</Typography>
        <Typography>
          • Process transactions and deliver services<br />
          • Improve user experience and personalize content<br />
          • Communicate important updates about your bookings<br />
          • Prevent fraud and ensure platform security
        </Typography>

        <Typography variant="h4">Data Protection</Typography>
        <Typography>
          We implement industry-standard encryption and security measures. Your payment information is processed through PCI-DSS compliant services.
        </Typography>

        <Typography variant="h4">Third-Party Sharing</Typography>
        <Typography>
          We only share necessary information with stadium authorities, hotels, and transportation providers to fulfill your bookings.
        </Typography>
      </Box>
    </Container>
  );
};

export default Privacy;