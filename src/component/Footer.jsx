import React from 'react';
import { 
  Box,
  Typography,
  Link,
  Divider,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';
import logo from '../assets/images/farwill.png'

// Mock data for footer sections
const footerData = {
  brand: {
    description: 'Celebrating African football excellence since 1957',
    socialLinks: [
      { icon: Facebook, url: '#' },
      { icon: Twitter, url: '#' },
      { icon: Instagram, url: '#' },
      { icon: YouTube, url: '#' }
    ]
  },
  quickLinks: [
    { label: 'Home', url: '/' },
    { label: 'packages', url: 'packages' },
    { label: 'Accomodation', url: 'accomodation' },
    { label: 'Tickets', url: 'tickets' },
    { label: 'Transportation', url: 'transportation' }
  ],
  supportLinks: [
    { label: 'FAQs', url: 'faqs' },
    { label: 'Help Center', url: 'help' },
    { label: 'Privacy Policy', url: 'privacy' },
    { label: 'Terms of Service', url: 'terms' },
    { label: 'Refund Policy', url: 'refund' },
  ],
  contactInfo: [
    { icon: Email, text: 'info@afcon.org' },
    { icon: Phone, text: '+123 456 7890' },
    { icon: LocationOn, text: 'CAF Headquarters, Cairo, Egypt' }
  ]
};

export default function Footer() {
  return (
    <Paper 
      component="footer" 
      square 
      sx={{
        bgcolor: 'grey.900',
        color: 'common.white',
        py: 6,
        px: 2
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={4}>
          {/* Brand Column */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" component="div">
                <img
                    src={logo}
                    alt="farwill logo"
                    style={{ height: '75px', width: 'auto', maxWidth: '100%' }}
                />
              </Typography>
              <Typography variant="body2" color="grey.400">
                {footerData.brand.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {footerData.brand.socialLinks.map((social, index) => (
                  <Link 
                    key={index} 
                    href={social.url} 
                    color="inherit"
                    sx={{
                      '&:hover': {color: '#046f04'},
                      transition: 'color 0.5s'
                    }}
                  >
                    <social.icon fontSize="medium" />
                  </Link>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Quick Links Column */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" gutterBottom>
              Quick Links
            </Typography>
            <List dense disablePadding>
              {footerData.quickLinks.map((link) => (
                <ListItem key={link.label} disableGutters>
                  <Link 
                    href={link.url} 
                    color="grey.400"
                    underline="hover"
                    sx={{
                      '&:hover': {color: '#046f04', textDecoration: 'none'}
                    }}
                  >
                    {link.label}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Support Column */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" gutterBottom>
              Support
            </Typography>
            <List dense disablePadding>
              {footerData.supportLinks.map((link) => (
                <ListItem key={link.label} disableGutters>
                  <Link 
                    href={link.url} 
                    color="grey.400"
                    underline="hover"
                    sx={{
                      '&:hover': { color: '#046f04', textDecoration: 'none' }
                    }}
                  >
                    {link.label}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Contact Column */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" gutterBottom>
              Contact
            </Typography>
            <List dense disablePadding>
              {footerData.contactInfo.map((contact, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemIcon sx={{ minWidth: 32, color: 'grey.400' }}>
                    <contact.icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={contact.text} 
                    primaryTypographyProps={{ color: 'grey.400', variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'grey.800' }} />

        <Typography 
          variant="body2" 
          color="grey.500" 
          align="center"
        >
          © {new Date().getFullYear()} AFCON Tournament. All rights reserved.
        </Typography>
      </Box>
    </Paper>
  );
};

