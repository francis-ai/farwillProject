import { Box, CssBaseline, useMediaQuery, IconButton, Drawer, styled } from '@mui/material';
import { useState, useEffect } from 'react';
import AdminSidebar from './Sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'sidebarOpen' })(
  ({ theme, sidebarOpen }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(sidebarOpen && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: '240px',
    }),
  })
);

export default function AdminLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#2a3447'
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <AdminSidebar onItemClick={() => setDrawerOpen(false)} />
      </Drawer>

      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#2a3447'
          },
        }}
        open
      >
        <AdminSidebar />
      </Drawer>

      {/* Main Content */}
      <Main sidebarOpen={sidebarOpen && !isMobile}>
        {/* Mobile Toggle Button */}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ 
              mr: 2,
              color: theme.palette.primary.main,
              position: 'fixed',
              top: 10,
              left: 10,
              zIndex: theme.zIndex.drawer + 1
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Box sx={{ p: 3, mt: isMobile ? 6 : 0 }}>
          {children}
        </Box>
      </Main>
    </Box>
  );
}