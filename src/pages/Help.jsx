import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import { ExpandMore, ContactSupport } from '@mui/icons-material';

const Help = () => {
    const primaryColor = "#046f04";
  const helpTopics = [
    {
      question: "How do I book accommodation?",
      answer: "Navigate to the Accommodation section, select your preferred hotel, choose dates, and complete payment."
    },
    {
      question: "Can I change my ticket type after purchase?",
      answer: "Ticket upgrades are possible up to 48 hours before the match. Contact support for assistance."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, mobile money, and bank transfers. All transactions are secure."
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6, mt: 5 }}>
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
          Help Center
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Find answers to common questions or contact our support team
        </Typography>
      </Box>

      <Box mb={6}>
        {helpTopics.map((topic, index) => (
          <Accordion key={index} sx={{ mb: 2, boxShadow: 3 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{topic.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{topic.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box textAlign="center" p={4} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <ContactSupport color="primary" sx={{ fontSize: 40, mb: 2 }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Still need help?
        </Typography>
        <Typography variant="body1" paragraph>
          Our support team is available 24/7 to assist you with any issues.
        </Typography>
        <Typography variant="h6" sx={{ color: '#046f04', fontWeight: 'bold' }}>
          Email: support@afcon.org | Phone: +123 456 7890
        </Typography>
      </Box>
    </Container>
  );
};

export default Help;