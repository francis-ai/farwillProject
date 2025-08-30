// src/components/MainLayout.jsx
import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import SupportTicket from '../component/SupportTicket';

export default function MainLayout({ children }) {
  return (
    <Box>
      <Navbar />
      {children}
      <SupportTicket />
      <Footer />
    </Box>
  );
}
