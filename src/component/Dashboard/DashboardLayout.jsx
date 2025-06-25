import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile Toggle Button */}
      <IconButton
        onClick={() => setSidebarOpen(true)}
        sx={{
          position: 'fixed',
          left: -6,
          top: 100,
          zIndex: 1100,
          display: { xs: 'block', md: 'none' },
          backgroundColor: '#046f04', 
          color: 'white', 
          '&:hover': {
            backgroundColor: '#035a03',
          },
          boxShadow: 3, 
          borderRadius: 2,
          p: 1, 
        }}
      >
        <ChevronRight fontSize="medium" />
      </IconButton>

      {/* Mobile Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { md: '20px' },
          width: { md: `calc(100% - 240px)` }
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;