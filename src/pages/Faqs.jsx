import { Container, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

const Faqs = () => {
  const primaryColor = "#046f04";
  
  const faqs = [
    { question: "When will tickets be delivered?", answer: "E-tickets are delivered immediately after payment confirmation." },
    { question: "Is there wheelchair access at stadiums?", answer: "All AFCON venues have dedicated wheelchair-accessible areas." },
    { question: "Can I get a refund if I can't attend?", answer: "See our Refund Policy for details on eligible refunds." }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6, mt: 5}}>
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
          FAQs
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Quick answers to your most common questions
        </Typography>
      </Box>

      <List sx={{ bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
        {faqs.map((faq, index) => (
          <Box key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={<Typography variant="h6" sx={{ fontWeight: 600 }}>{faq.question}</Typography>}
                secondary={faq.answer}
              />
            </ListItem>
            {index < faqs.length - 1 && <Divider component="li" />}
          </Box>
        ))}
      </List>
    </Container>
  );
};

export default Faqs;