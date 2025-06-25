import { Container, Typography, Box, List, ListItem, ListItemIcon } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const Terms = () => {
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
          Terms of Service
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Effective from June 2025
        </Typography>
      </Box>

      <Box sx={{ 
        backgroundColor: '#f5f5f5', 
        p: 4, 
        borderRadius: 2, 
        mb: 4,
        borderLeft: '4px solid #046f04'
      }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          By using our platform, you agree to:
        </Typography>
        <List>
          {[
            "Provide accurate information for all bookings",
            "Use tickets/services only for personal use",
            "Comply with all stadium/hotel regulations",
            "Not resell tickets above face value",
            "Accept all risks associated with event attendance"
          ].map((item, index) => (
            <ListItem key={index} sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <Typography>{item}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ '& h4': { mt: 4, mb: 2, color: '#046f04' } }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Account Responsibility</Typography>
        <Typography>
          You are responsible for maintaining account security and all activities under your account. Notify us immediately of any unauthorized use.
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Service Modifications</Typography>
        <Typography>
          We reserve the right to modify or discontinue services temporarily or permanently with notice. Match dates/times are subject to change by event organizers.
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Limitation of Liability</Typography>
        <Typography>
          FARWILL CREDIT UNITED is not liable for injuries, losses, or damages incurred during event attendance beyond the face value of purchased tickets.
        </Typography>
      </Box>
    </Container>
  );
};

export default Terms;