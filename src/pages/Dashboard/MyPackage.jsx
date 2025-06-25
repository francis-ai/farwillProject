import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  Chip, 
  Button, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@mui/material';
import {
  ConfirmationNumber,
  Hotel,
  DirectionsBus,
  Star,
  EventSeat,
  SportsSoccer,
  CreditCard
} from '@mui/icons-material';
import DashboardLayout from '../../component/Dashboard/DashboardLayout';

const MyPackage = () => {
  // Sample data - replace with actual user package data
  const userPackage = {
    name: "VIP Experience",
    price: "$5,999",
    status: "Active",
    purchaseDate: "June 1, 2025",
    expiryDate: "July 15, 2025",
    benefits: [
      "All Match Tickets (VIP Seating)",
      "Luxury Hotel Accommodation",
      "Airport Transfers",
      "VIP Lounge Access",
      "Meet & Greet Opportunities",
      "Exclusive Merchandise Pack"
    ],
    upcomingMatches: [
      { date: "Jun 15", teams: "Morocco vs Nigeria", venue: "Casablanca" },
      { date: "Jun 20", teams: "Egypt vs Senegal", venue: "Rabat" },
      { date: "Jun 25", teams: "Quarter Finals", venue: "Marrakech" }
    ]
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4, mt: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 700,
            color: '#046f04',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <ConfirmationNumber fontSize="large" />
            My Package
          </Typography>
          <Chip 
            label={userPackage.status}
            color={userPackage.status === "Active" ? "success" : "error"}
            sx={{ fontWeight: 600, px: 1 }}
          />
        </Box>

        <Card sx={{ 
          borderRadius: 3,
          boxShadow: 3,
          mb: 4,
          borderLeft: '4px solid #046f04'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'center' },
              mb: 3
            }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {userPackage.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Purchased on {userPackage.purchaseDate} • Valid until {userPackage.expiryDate}
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ color: '#046f04', fontWeight: 700, mt: { xs: 2, md: 0 } }}>
                {userPackage.price}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#046f04' }}>
              Package Benefits
            </Typography>
            <List dense>
              {userPackage.benefits.map((benefit, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {index === 0 && <EventSeat color="primary" />}
                    {index === 1 && <Hotel color="primary" />}
                    {index === 2 && <DirectionsBus color="primary" />}
                    {index === 3 && <Star color="primary" />}
                    {index === 4 && <SportsSoccer color="primary" />}
                    {index === 5 && <CreditCard color="primary" />}
                  </ListItemIcon>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#046f04' }}>
              Upcoming Matches Included
            </Typography>
            
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
              gap: 3
            }}>
              {userPackage.upcomingMatches.map((match, index) => (
                <Card key={index} variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3
                  }}>
                    <Avatar sx={{ 
                      bgcolor: '#046f04', 
                      color: 'white',
                      mb: 2,
                      width: 56,
                      height: 56
                    }}>
                      {match.date}
                    </Avatar>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {match.teams}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {match.venue}
                    </Typography>
                    <Button 
                      size="small" 
                      sx={{ 
                        mt: 2,
                        color: '#046f04',
                        textTransform: 'none'
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ 
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          mt: 4
        }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#046f04',
              color: '#046f04',
              px: 4,
              py: 1.5
            }}
          >
            Download Invoice
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#046f04',
              '&:hover': { backgroundColor: '#035a03' },
              px: 4,
              py: 1.5
            }}
          >
            Upgrade Package
          </Button>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default MyPackage;