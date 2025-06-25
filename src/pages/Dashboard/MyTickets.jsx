import React, { useState } from 'react';
import DashboardLayout from '../../component/Dashboard/DashboardLayout';
import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Modal,
  Box,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import jsPDF from 'jspdf';
import { FiDownload, FiEye } from 'react-icons/fi';

const mockTickets = [
  {
    id: 1,
    match: 'Nigeria vs Egypt',
    date: '2025-01-15',
    time: '18:00',
    seat: 'A23',
    stadium: 'Abidjan Stadium',
    category: 'VIP'
  },
  {
    id: 2,
    match: 'Cameroon vs Ghana',
    date: '2025-01-20',
    time: '20:00',
    seat: 'B12',
    stadium: 'Bouake Stadium',
    category: 'Standard'
  },
];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '80%', md: '600px' },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: 'none'
};

const primaryColor = '#068a06';

export default function MyTicket() {
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleOpen = (ticket) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const generatePDF = (ticket) => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add AFCON logo or header
    pdf.setFontSize(22);
    pdf.setTextColor(6, 138, 6); // #068a06 in RGB
    pdf.text('AFCON 2025 Ticket', 105, 20, { align: 'center' });
    
    // Add ticket details
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0); // Black text
    
    pdf.text(`Match: ${ticket.match}`, 20, 40);
    pdf.text(`Date: ${ticket.date} at ${ticket.time}`, 20, 50);
    pdf.text(`Stadium: ${ticket.stadium}`, 20, 60);
    pdf.text(`Category: ${ticket.category}`, 20, 70);
    pdf.text(`Seat: ${ticket.seat}`, 20, 80);
    
    // Add decorative elements
    pdf.setDrawColor(6, 138, 6);
    pdf.setLineWidth(0.5);
    pdf.line(20, 85, 190, 85);
    
    // Add footer
    pdf.setFontSize(10);
    pdf.text('© AFCON 2025 - All rights reserved', 105, 280, { align: 'center' });
    
    pdf.save(`AFCON-Ticket-${ticket.id}.pdf`);
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 6, py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: primaryColor, fontWeight: 'bold' }}>
          My Tickets
        </Typography>

        <Grid container spacing={4}>
          {mockTickets.map((ticket) => (
            <Grid item xs={12} sm={6} md={4} key={ticket.id} sx={{mb: 3}}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  borderLeft: `4px solid ${primaryColor}`,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {ticket.match}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {ticket.date} • {ticket.time}
                </Typography>
                
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <Box component="span" fontWeight="bold">Stadium:</Box> {ticket.stadium}
                </Typography>
                
                <Box sx={{ mt: 'auto', pt: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<FiEye />}
                    onClick={() => handleOpen(ticket)}
                    sx={{
                      backgroundColor: primaryColor,
                      '&:hover': { backgroundColor: '#056a05' }
                    }}
                    fullWidth
                  >
                    View Ticket
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Ticket Details Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            {selectedTicket && (
              <Card>
                <CardContent>
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      color: primaryColor,
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}
                  >
                    AFCON 2025 Ticket
                  </Typography>
                  
                  <Divider sx={{ my: 2, borderColor: primaryColor }} />
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Match Details
                      </Typography>
                      <Typography>{selectedTicket.match}</Typography>
                      <Typography sx={{ mt: 1 }}>{selectedTicket.date} at {selectedTicket.time}</Typography>
                      <Typography sx={{ mt: 1 }}>{selectedTicket.stadium}</Typography>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Ticket Information
                      </Typography>
                      <Typography>Category: {selectedTicket.category}</Typography>
                      <Typography sx={{ mt: 1 }}>Seat: {selectedTicket.seat}</Typography>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      startIcon={<FiDownload />}
                      onClick={() => {
                        generatePDF(selectedTicket);
                        handleClose();
                      }}
                      sx={{
                        backgroundColor: primaryColor,
                        '&:hover': { backgroundColor: '#056a05' }
                      }}
                    >
                      Download Ticket
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>
        </Modal>
      </Container>
    </DashboardLayout>
  );
}