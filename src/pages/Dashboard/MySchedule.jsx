import React from 'react';
import DashboardLayout from '../../component/Dashboard/DashboardLayout';
import { 
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
  Box
} from '@mui/material';
import {
  FlightTakeoff,
  Hotel,
  SportsSoccer,
  DirectionsBus,
  Tour,
  Sports,
  NotificationsActive
} from '@mui/icons-material';

const scheduleItems = [
  {
    id: 1,
    type: 'flight',
    title: 'Flight to Abidjan',
    time: '2025-01-10 08:00',
    description: 'Air Peace Flight P47123 - Economy Class',
    status: 'confirmed'
  },
  {
    id: 2,
    type: 'hotel',
    title: 'Hotel Check-in',
    time: '2025-01-10 14:00',
    description: 'Radisson Blu Hotel, Abidjan - Deluxe Room',
    status: 'confirmed'
  },
  {
    id: 3,
    type: 'training',
    title: 'Nigeria Team Training Session',
    time: '2025-01-12 10:00',
    description: 'Closed training session at National Stadium',
    status: 'confirmed'
  },
  {
    id: 4,
    type: 'match',
    title: 'Nigeria vs Egypt',
    time: '2025-01-15 18:00',
    description: 'Group Stage Match - Abidjan Stadium',
    status: 'upcoming'
  },
  {
    id: 5,
    type: 'shuttle',
    title: 'Stadium Shuttle',
    time: '2025-01-15 16:00',
    description: 'Pickup from hotel lobby to stadium',
    status: 'pending'
  },
  {
    id: 6,
    type: 'tour',
    title: 'Stadium Tour',
    time: '2025-01-16 11:00',
    description: 'Guided tour of Abidjan Stadium',
    status: 'confirmed'
  }
];

const getIcon = (type) => {
  switch(type) {
    case 'flight': return <FlightTakeoff />;
    case 'hotel': return <Hotel />;
    case 'match': return <SportsSoccer />;
    case 'shuttle': return <DirectionsBus />;
    case 'tour': return <Tour />;
    case 'training': return <Sports />;
    default: return <NotificationsActive />;
  }
};

const getStatusColor = (status) => {
  switch(status) {
    case 'confirmed': return 'success';
    case 'upcoming': return 'info';
    case 'pending': return 'warning';
    default: return 'default';
  }
};

export default function MySchedule() {
  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4, mt: 5 }}>
        <Typography variant="h4" sx={{ 
          mb: 3,
          fontWeight: 'bold',
          color: '#068a06'
        }}>
          My AFCON 2025 Schedule
        </Typography>

        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {scheduleItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem alignItems="flex-start" sx={{ py: 3 }}>
                <ListItemAvatar sx={{ minWidth: '56px' }}>
                  <Avatar sx={{ 
                    bgcolor: '#068a06',
                    color: 'white',
                    width: 40,
                    height: 40
                  }}>
                    {getIcon(item.type)}
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <Typography variant="h6" component="span">
                        {item.title}
                      </Typography>
                      <Chip 
                        label={item.status} 
                        color={getStatusColor(item.status)} 
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        display="block"
                        sx={{ mt: 0.5 }}
                      >
                        {new Date(item.time).toLocaleString()}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        display="block"
                        sx={{ mt: 0.5 }}
                      >
                        {item.description}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              
              {index < scheduleItems.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </Container>
    </DashboardLayout>
  );
}