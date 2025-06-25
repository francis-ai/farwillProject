import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  Avatar,
//   useTheme
} from '@mui/material';
import {
  SportsSoccer,
  Groups,
  EmojiEvents
} from '@mui/icons-material';


const OurMission = () => {
//   const theme = useTheme();
  const primaryColor = "#046f04";

  const missionCards = [
    {
      title: "Football First",
      icon: <SportsSoccer sx={{ fontSize: 50 }} />,
      description: "Putting the beautiful game at the heart of everything we do, promoting technical excellence and fair play across Africa."
    },
    {
      title: "Fan Community",
      icon: <Groups sx={{ fontSize: 50 }} />,
      description: "Building passionate football communities that unite nations and celebrate African football culture together."
    },
    {
      title: "Tournament Legacy",
      icon: <EmojiEvents sx={{ fontSize: 50 }} />,
      description: "Creating lasting infrastructure and development programs that benefit African football for generations to come."
    }
  ];

  return (
    <Box sx={{p: 3}}>
      {/* Full-width container without side margin */}
      <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
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
                animation: `1s ease-out`,
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
            Our Mission
        </Typography>


        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          sx={{
            maxWidth: 700,
            mx: 'auto',
            mb: 6
          }}
        >
          We're committed to elevating African football through three core principles that guide our every decision
        </Typography>

        <Grid
          container
          spacing={2}
          justifyContent="center"
        >
          {missionCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 320,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 4,
                  boxShadow: `0 10px 20px rgba(0, 0, 0, 0.1)`,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 10px 20px rgba(0, 0, 0, 0.1)`
                  }
                }}
                elevation={0}
              >
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mb: 3,
                    backgroundColor: `${primaryColor}20`,
                    color: primaryColor
                  }}
                >
                  {card.icon}
                </Avatar>

                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    color: primaryColor
                  }}
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                >
                  {card.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Decorative Shape at Bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '20%',
          backgroundColor: `${primaryColor}08`,
          clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0% 100%)',
          zIndex: 0
        }}
      />
    </Box>
  );
};

export default OurMission;
