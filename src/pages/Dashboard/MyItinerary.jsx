import { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Divider,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Paper
} from '@mui/material';
import {
  Event,
  Hotel,
  DirectionsBus,
  SportsSoccer,
  MoreVert,
  Edit,
  Delete,
  Add,
  ArrowForward, ExpandLess, ExpandMore
} from '@mui/icons-material';
import DashboardLayout from '../../component/Dashboard/DashboardLayout';

const MyItinerary = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const itineraryItems = [
    {
      id: 1,
      date: '2025-06-15',
      type: 'match',
      title: 'Morocco vs Nigeria',
      time: '20:00',
      location: 'Grand Stade de Casablanca',
      details: 'Group Stage - Seat: North Stand, Row 15',
      transport: 'Shuttle bus from Hotel at 18:00'
    },
    {
      id: 2,
      date: '2025-06-16',
      type: 'accommodation',
      title: 'Royal Casablanca Hotel',
      time: '14:00',
      location: '123 Boulevard Mohamed VI',
      details: 'Deluxe Room - Check-in: 14:00, Check-out: 12:00'
    },
    {
      id: 3,
      date: '2025-06-17',
      type: 'transport',
      title: 'Airport Transfer',
      time: '08:00',
      location: 'Mohammed V International Airport',
      details: 'Private car pickup at hotel lobby'
    }
  ];

  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4, mt: 5 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4
        }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 700,
            color: '#046f04',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <Event fontSize="large" />
            My Itinerary
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              backgroundColor: '#046f04',
              '&:hover': { backgroundColor: '#035a03' }
            }}
          >
            Add Item
          </Button>
        </Box>

        <Paper elevation={0} sx={{ 
          p: 3, 
          mb: 4,
          backgroundColor: '#f5f5f5',
          borderRadius: 3
        }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Upcoming Events (3)
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
            {['Today', 'Tomorrow', 'Jun 15', 'Jun 16', 'Jun 17'].map((day) => (
              <Chip
                key={day}
                label={day}
                clickable
                sx={{
                  px: 2,
                  backgroundColor: day === 'Today' ? '#046f04' : 'white',
                  color: day === 'Today' ? 'white' : 'text.primary',
                  boxShadow: 1
                }}
              />
            ))}
          </Box>
        </Paper>

        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {itineraryItems.map((item) => (
            <Card key={item.id} sx={{ 
              mb: 3, 
              borderRadius: 3,
              boxShadow: 3,
              borderLeft: `4px solid ${
                item.type === 'match' ? '#046f04' : 
                item.type === 'accommodation' ? '#1976d2' : 
                '#ff9800'
              }`
            }}>
              <CardContent sx={{ p: 0 }}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end">
                      <MoreVert />
                    </IconButton>
                  }
                  sx={{ pr: 4 }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ 
                      bgcolor: 
                        item.type === 'match' ? '#046f0420' : 
                        item.type === 'accommodation' ? '#1976d220' : 
                        '#ff980020',
                      color: 
                        item.type === 'match' ? '#046f04' : 
                        item.type === 'accommodation' ? '#1976d2' : 
                        '#ff9800'
                    }}>
                      {item.type === 'match' ? <SportsSoccer /> :
                       item.type === 'accommodation' ? <Hotel /> :
                       <DirectionsBus />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {item.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {item.time} • {item.location}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>

                {expandedItem === item.id && (
                  <>
                    <Divider />
                    <Box sx={{ p: 3 }}>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {item.details}
                      </Typography>
                      {item.transport && (
                        <Typography variant="body2" sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          color: 'text.secondary',
                          gap: 1
                        }}>
                          <DirectionsBus fontSize="small" />
                          {item.transport}
                        </Typography>
                      )}
                      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <Button
                          variant="outlined"
                          startIcon={<Edit />}
                          sx={{
                            borderColor: '#046f04',
                            color: '#046f04'
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Delete />}
                          sx={{
                            borderColor: 'error.main',
                            color: 'error.main'
                          }}
                        >
                          Remove
                        </Button>
                        {item.type === 'match' && (
                          <Button
                            variant="contained"
                            endIcon={<ArrowForward />}
                            sx={{
                              ml: 'auto',
                              backgroundColor: '#046f04',
                              '&:hover': { backgroundColor: '#035a03' }
                            }}
                          >
                            Match Details
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </>
                )}

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  backgroundColor: '#fafafa',
                  borderBottomLeftRadius: 3,
                  borderBottomRightRadius: 3
                }}>
                  <IconButton onClick={() => toggleExpand(item.id)}>
                    {expandedItem === item.id ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </List>
      </Container>
    </DashboardLayout>
  );
};

export default MyItinerary;