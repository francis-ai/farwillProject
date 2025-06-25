import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Button, 
  Modal, 
  TextField, 
  Container,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack
} from '@mui/material';
import { Edit, Check, Close, Email, Phone, LocationOn } from '@mui/icons-material';
import DashboardLayout from '../../component/Dashboard/DashboardLayout';

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+123 456 7890',
    location: 'Cairo, Egypt',
    bio: 'AFCON 2025 Premium Member'
  });

  const [editData, setEditData] = useState({ ...profile });

  const handleOpenEdit = () => {
    setEditData({ ...profile });
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleSave = () => {
    setProfile({ ...editData });
    setIsEditModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4, mt: 5 }}>
        {/* Header Section */}
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
            fontSize: {sx: '0.8rem', sm: '1.8rem', md: '2.4rem'},
            alignItems: 'center',
            gap: 1
          }}>
            My Profile
          </Typography>
          <Button 
            variant="outlined"
            startIcon={<Edit />}
            onClick={handleOpenEdit}
            sx={{
              borderColor: '#046f04',
              color: '#046f04',
              '&:hover': {
                backgroundColor: '#046f04',
                color: 'white',
                borderColor: '#046f04'
              }
            }}
          >
            Edit Profile
          </Button>
        </Box>

        {/* Profile Content */}
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Profile Card */}
          <Card sx={{ 
            width: { xs: '100%', md: 350 },
            height: 'fit-content',
            borderRadius: 3,
            boxShadow: 3
          }}>
            <CardContent sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              p: 4,
              textAlign: 'center'
            }}>
              <Avatar 
                sx={{ 
                  width: 120, 
                  height: 120, 
                  fontSize: 48,
                  bgcolor: '#046f04',
                  mb: 3
                }}
              >
                {profile.name.charAt(0)}
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {profile.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {profile.bio}
              </Typography>
              <Divider sx={{ width: '100%', my: 2 }} />
              <Stack spacing={2} width="100%">
                <ProfileDetail icon={<Email color="primary" />} label="Email" value={profile.email} />
                <ProfileDetail icon={<Phone color="primary" />} label="Phone" value={profile.phone} />
                <ProfileDetail icon={<LocationOn color="primary" />} label="Location" value={profile.location} />
              </Stack>
            </CardContent>
          </Card>

          {/* Stats/Additional Info Section */}
          <Box sx={{ flex: 1 }}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#046f04' }}>
                  Membership Details
                </Typography>
                <Stack spacing={2}>
                  <ProfileStat label="Member Since" value="January 2025" />
                  <ProfileStat label="Ticket Purchases" value="8" />
                  <ProfileStat label="Upcoming Bookings" value="3" />
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#046f04' }}>
                  Preferences
                </Typography>
                <Typography>
                  Notification preferences, favorite teams, and other settings would appear here.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Edit Modal */}
        <Modal open={isEditModalOpen} onClose={handleCloseEdit}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 600 },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
            outline: 'none'
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#046f04' }}>
                Edit Profile Information
              </Typography>
              <IconButton onClick={handleCloseEdit} sx={{ color: 'text.secondary' }}>
                <Close />
              </IconButton>
            </Box>

            <Box component="form" sx={{ '& .MuiTextField-root': { mb: 3 } }}>
              <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' }, mt: 2 }}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={editData.phone}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={editData.location}
                  onChange={handleChange}
                />
              </Box>

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Bio"
                name="bio"
                value={editData.bio}
                onChange={handleChange}
                sx={{ mt: 2 }}
              />

              <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                <Button 
                  variant="outlined" 
                  onClick={handleCloseEdit}
                  sx={{ 
                    color: '#046f04', 
                    borderColor: '#046f04',
                    px: 3,
                    py: 1
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<Check />}
                  onClick={handleSave}
                  sx={{ 
                    backgroundColor: '#046f04', 
                    '&:hover': { backgroundColor: '#035a03' },
                    px: 3,
                    py: 1
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Container>
    </DashboardLayout>
  );
};

// Reusable profile detail component with icon
const ProfileDetail = ({ icon, label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    {icon}
    <Box>
      <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>{value}</Typography>
    </Box>
  </Box>
);

// Reusable stat component
const ProfileStat = ({ label, value }) => (
  <Box>
    <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
    <Typography variant="h6" sx={{ fontWeight: 600 }}>{value}</Typography>
  </Box>
);

export default Profile;