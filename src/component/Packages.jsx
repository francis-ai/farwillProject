import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  RadioGroup,
  FormControlLabel,
  Radio,
  Collapse,
  IconButton,
  Button,
  Divider,
  Snackbar,
  Alert,
  Modal
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const BASE_URL = process.env.REACT_APP_API_URL;
const primaryColor = "#046f04";

export default function PackagesCard() {
  const { user } = useAuth();   // ✅ auth context
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [fees, setFees] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState({});
  const [selectedPeople, setSelectedPeople] = useState({});
  const [expanded, setExpanded] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pkgRes, feesRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/public/packages`),
          axios.get(`${BASE_URL}/api/public/fees`)
        ]);

        const pkgs = pkgRes.data.data || [];
        setPackages(pkgs);
        setFees(feesRes.data.data || feesRes.data || null);
      } catch (err) {
        console.error('Failed to fetch packages/fees:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <CircularProgress />;

  const groupedPackages = packages.reduce((acc, pkg) => {
    if (!acc[pkg.category]) acc[pkg.category] = [];
    acc[pkg.category].push(pkg);
    return acc;
  }, {});

  const handleTabChange = (category, newIndex) => {
    setTabIndex((prev) => ({ ...prev, [category]: newIndex }));
  };

  const handlePeopleChange = (category, people) => {
    setSelectedPeople((prev) => ({ ...prev, [category]: Number(people) }));
  };

  const toggleExpand = (category) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const calculateTotal = (category) => {
    const pkgsInCategory = groupedPackages[category] || [];
    if (!fees || pkgsInCategory.length === 0) return 0;

    const duration = pkgsInCategory.flatMap(pkg => pkg.durations)[tabIndex[category] || 0];
    if (!duration) return 0;

    const people = selectedPeople[category] || 1;
    const room = duration.roomOptions.find(r => r.people === people);
    const roomPrice = room ? room.price : 0;

    const subtotal = roomPrice +
      (fees.visaFee || 0) +
      (fees.airportPickupFee || 0) +
      (fees.miscFee || 0) +
      (fees.ticketPrice || 0);

    return subtotal * (1 + (fees.marginPercentage || 20) / 100);
  };

  const handleActivatePlan = (category) => {
    if (!user) {
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
      return;
    }

    // build plan details
    const duration = groupedPackages[category].flatMap(pkg => pkg.durations)[tabIndex[category] || 0];
    const people = selectedPeople[category] || 1;
    const room = duration.roomOptions.find(r => r.people === people);

    setSelectedPlan({
      category,
      nights: duration.nights,
      people,
      price: room ? room.price : 0,
      total: calculateTotal(category)
    });
    setCheckoutOpen(true);
  };

  

  return (
    <Box sx={{ mt: 4, mb: 4, px: 2, mx: 'auto' }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: primaryColor,
          mb: 4,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontSize: { xs: '1.5rem', sm: '2.0rem', md: '2.5rem' },
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
        Our Packages
      </Typography>

      <Grid container spacing={3}>
        {Object.entries(groupedPackages).map(([category, pkgsInCategory]) => (
          <Grid item xs={12} sm={6} md={4} key={category}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              {/* Header */}
              <Box sx={{
                bgcolor: primaryColor, color: "white", textAlign: "center",
                py: 1.4, fontWeight: 600, fontSize: "1.8rem", letterSpacing: "1px"
              }}>
                {category}
              </Box>

              <CardContent>
                {/* Tabs */}
                <Tabs
                  value={tabIndex[category] || 0}
                  onChange={(e, val) => handleTabChange(category, val)}
                  centered
                  sx={{
                    mb: 2,
                    "& .MuiTab-root": {
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      "&.Mui-selected": { color: primaryColor }
                    },
                    "& .MuiTabs-indicator": { backgroundColor: primaryColor }
                  }}
                >
                  {pkgsInCategory.flatMap(pkg => pkg.durations).map((dur) => (
                    <Tab key={dur.nights} label={`${dur.nights} nights`} />
                  ))}
                </Tabs>

                {/* Radio Options */}
                {pkgsInCategory.flatMap(pkg => pkg.durations).map((dur, idx) => {
                  if (idx !== (tabIndex[category] || 0)) return null;
                  return (
                    <RadioGroup
                      key={dur.nights}
                      value={selectedPeople[category] || 1}
                      onChange={(e) => handlePeopleChange(category, e.target.value)}
                    >
                      {dur.roomOptions.map((ro) => (
                        <FormControlLabel
                          key={ro.people}
                          value={ro.people}
                          control={<Radio sx={{ color: primaryColor, "&.Mui-checked": { color: primaryColor } }} />}
                          label={`${ro.people} person(s) per room: ₦${ro.price.toLocaleString()}`}
                        />
                      ))}
                    </RadioGroup>
                  );
                })}

                {/* Total */}
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6" sx={{ color: primaryColor, fontWeight: 700 }}>
                    Total: ₦{calculateTotal(category).toLocaleString()}
                  </Typography>
                  <IconButton size="small" onClick={() => toggleExpand(category)}>
                    <ExpandMoreIcon
                      sx={{ transform: expanded[category] ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }}
                    />
                  </IconButton>
                </Box>
                <Collapse in={expanded[category]}>
                  <Typography>Visa Fee: ₦{fees.visaFee.toLocaleString()}</Typography>
                  <Typography>Airport Pickup: ₦{fees.airportPickupFee.toLocaleString()}</Typography>
                  <Typography>Misc Fee: ₦{fees.miscFee.toLocaleString()}</Typography>
                  <Typography>Match Ticket: ₦{fees.ticketPrice.toLocaleString()}</Typography>
                  <Typography>Margin: {fees.marginPercentage || 20}%</Typography>
                </Collapse>

                {/* Activate Button */}
                <Box mt={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ bgcolor: primaryColor, "&:hover": { bgcolor: "#035603" }, py: 1, borderRadius: 2 }}
                    onClick={() => handleActivatePlan(category)}
                  >
                    Activate Plan
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for login required */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="warning">Please login to continue</Alert>
      </Snackbar>

      {/* Checkout Modal */}
      <Modal open={checkoutOpen} onClose={() => setCheckoutOpen(false)}>
        <Box sx={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          bgcolor: "white", p: 4, borderRadius: 3, width: {xs: 250, md: 400}
        }}>
          <Typography variant="h6" gutterBottom>Checkout</Typography>
          {selectedPlan && (
            <>
              <Box sx={{m: 2}}>
                <Typography>Category: {selectedPlan.category}</Typography>
                <Typography>Nights: {selectedPlan.nights}</Typography>
                <Typography>People per Room: {selectedPlan.people}</Typography>
                <Typography>Base Price: ₦{selectedPlan.price.toLocaleString()}</Typography>
              </Box>
              
              <Divider />
              <Box sx={{m: 1}}>
                <Typography>Visa Fee: ₦{fees.visaFee.toLocaleString()}</Typography>
                <Typography>Airport Pickup: ₦{fees.airportPickupFee.toLocaleString()}</Typography>
                <Typography>Misc Fee: ₦{fees.miscFee.toLocaleString()}</Typography>
                <Typography>Match Ticket: ₦{fees.ticketPrice.toLocaleString()}</Typography>
                <Typography>Margin: {fees.marginPercentage || 20}%</Typography>
              </Box>
              <Divider />
              <Typography fontWeight={700} mt={2}>
                Total: ₦{selectedPlan.total.toLocaleString()}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, bgcolor: primaryColor, "&:hover": { bgcolor: "#035603" } }}
              >
                Pay with Paystack
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
