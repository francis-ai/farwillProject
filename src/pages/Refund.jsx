import { Container, Typography, Box, Paper } from '@mui/material';
import { Warning } from '@mui/icons-material';

const Refund = () => {
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
          Refund Policy
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Our guidelines for ticket and accommodation refunds
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mb: 4, borderLeft: '4px solid #046f04' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Ticket Refunds
        </Typography>
        <Typography paragraph>
          • Full refund available up to 30 days before match day (minus 10% processing fee)
        </Typography>
        <Typography paragraph>
          • 50% refund between 30-15 days before match day
        </Typography>
        <Typography paragraph>
          • No refunds within 14 days of match day
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4, borderLeft: '4px solid #046f04' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Accommodation Refunds
        </Typography>
        <Typography paragraph>
          • Free cancellation up to 7 days before check-in
        </Typography>
        <Typography paragraph>
          • 50% refund for cancellations within 7 days
        </Typography>
        <Typography paragraph>
          • No refunds for no-shows or early departures
        </Typography>
      </Paper>

      <Box sx={{ p: 3, backgroundColor: '#fff8e1', borderRadius: 2, display: 'flex', alignItems: 'center' }}>
        <Warning color="warning" sx={{ fontSize: 40, mr: 2 }} />
        <Typography>
          <strong>Note:</strong> Refunds may take 7-10 business days to process. Contact support@afcon.org for assistance.
        </Typography>
      </Box>
    </Container>
  );
};

export default Refund;