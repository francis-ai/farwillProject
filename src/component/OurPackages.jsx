import React, { useState, useEffect } from "react";
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
  Modal,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL;
const primaryColor = "#046f04";

export default function PackagesCard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [fees, setFees] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState({});
  const [selectedPeople, setSelectedPeople] = useState({});
  const [expanded, setExpanded] = useState({});
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, severity: "info", message: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pkgRes, feesRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/public/packages`),
          axios.get(`${BASE_URL}/api/public/fees`),
        ]);
        setPackages(pkgRes.data.data || []);
        setFees(feesRes.data.data || feesRes.data || {});
      } catch (err) {
        console.error("Fetch failed:", err);
        setSnackbar({ open: true, severity: "error", message: "Failed to load packages or fees" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <CircularProgress />;

  const groupedPackages = packages.reduce((acc, pkg) => {
    acc[pkg.category] = acc[pkg.category] || [];
    acc[pkg.category].push(pkg);
    return acc;
  }, {});

  const calculateTotal = (category) => {
    const pkgs = groupedPackages[category] || [];
    if (!fees || !pkgs.length) return 0;

    const duration = pkgs.flatMap((p) => p.durations)[tabIndex[category] || 0];
    if (!duration) return 0;

    const people = selectedPeople[category] || 1;
    const room = duration.roomOptions.find((r) => r.people === people);
    const subtotal = (room?.price || 0) + (fees.visaFee || 0) + (fees.airportPickupFee || 0) + (fees.miscFee || 0) + (fees.ticketPrice || 0);
    return subtotal * (1 + (fees.marginPercentage || 20) / 100);
  };

  const handleActivatePlan = (category) => {
    if (!user) {
      setSnackbar({ open: true, severity: "warning", message: "Please login to continue" });
      setTimeout(() => navigate("/signin"), 3000);
      return;
    }

    const duration = groupedPackages[category].flatMap((pkg) => pkg.durations)[tabIndex[category] || 0];
    const people = selectedPeople[category] || 1;
    const room = duration.roomOptions.find((r) => r.people === people);

    setSelectedPlan({
      category,
      nights: duration.nights,
      people,
      price: room?.price || 0,
      total: calculateTotal(category),
    });
    setCheckoutOpen(true);
  };

  const handlePaystackPayment = () => {
    if (!selectedPlan || !user) return;
    const plan = { ...selectedPlan };
    const handler = window.PaystackPop.setup({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || "pk_test_5624a1b37a80ce2f38d7d2da8e5d02a2a405d8de",
      email: user.email,
      amount: plan.total * 100,
      currency: "NGN",
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      callback: (response) => {
        setTimeout(async () => {
          try {
            const res = await axios.post(`${BASE_URL}/api/user/verify`, {
              reference: response.reference,
              user: { id: user._id, email: user.email },
              plan: { category: plan.category, nights: plan.nights, people: plan.people, total: plan.total, price: plan.price },
            });
            console.log("Verify response:", res.data);
            setSnackbar({ open: true, severity: "success", message: `Payment completed & reservation saved! Ref: ${response.reference}` });
            setCheckoutOpen(false);
          } catch (err) {
            console.error("Verify error:", err.response?.data || err.message);
            setSnackbar({ open: true, severity: "error", message: "Payment succeeded but saving reservation failed" });
          }
        }, 0);
      },
      onClose: () => setSnackbar({ open: true, severity: "info", message: "Payment popup closed" }),
    });
    handler.openIframe();
  };

  return (
    <Box sx={{ mt: 4, mb: 4, px: 2, mx: "auto" }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 600, color: primaryColor, mb: 4 }}>
        Our Packages
      </Typography>

      <Grid container spacing={3}>
        {Object.entries(groupedPackages).map(([category, pkgs]) => {
          const idx = tabIndex[category] || 0;
          const duration = pkgs.flatMap((p) => p.durations)[idx];
          return (
            <Grid item xs={12} sm={6} md={4} key={category}>
              <Card elevation={3} sx={{ borderRadius: 3 }}>
                <Box sx={{ bgcolor: primaryColor, color: "#fff", textAlign: "center", py: 1.4, fontWeight: 600, fontSize: "1.8rem" }}>
                  {category}
                </Box>
                <CardContent>
                  <Tabs value={idx} onChange={(e, val) => setTabIndex((prev) => ({ ...prev, [category]: val }))} centered sx={{ mb: 2, "& .MuiTabs-indicator": { backgroundColor: primaryColor } }}>
                    {pkgs.flatMap((pkg) => pkg.durations).map((dur) => (
                      <Tab key={dur.nights} label={`${dur.nights} nights`} />
                    ))}
                  </Tabs>

                  <RadioGroup value={selectedPeople[category] || 1} onChange={(e) => setSelectedPeople((prev) => ({ ...prev, [category]: Number(e.target.value) }))}>
                    {duration.roomOptions.map((ro) => (
                      <FormControlLabel key={ro.people} value={ro.people} control={<Radio sx={{ color: primaryColor, "&.Mui-checked": { color: primaryColor } }} />} label={`${ro.people} person(s) per room: ₦${ro.price.toLocaleString()}`} />
                    ))}
                  </RadioGroup>

                  <Divider sx={{ my: 2 }} />
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6" sx={{ color: primaryColor, fontWeight: 700 }}>
                      Total: ₦{calculateTotal(category).toLocaleString()}
                    </Typography>
                    <IconButton size="small" onClick={() => setExpanded((prev) => ({ ...prev, [category]: !prev[category] }))}>
                      <ExpandMoreIcon sx={{ transform: expanded[category] ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }} />
                    </IconButton>
                  </Box>
                  <Collapse in={expanded[category]}>
                    <Typography>Visa Fee: ₦{fees.visaFee.toLocaleString()}</Typography>
                    <Typography>Airport Pickup: ₦{fees.airportPickupFee.toLocaleString()}</Typography>
                    <Typography>Misc Fee: ₦{fees.miscFee.toLocaleString()}</Typography>
                    <Typography>Match Ticket: ₦{fees.ticketPrice.toLocaleString()}</Typography>
                    <Typography>Margin: {fees.marginPercentage || 20}%</Typography>
                  </Collapse>

                  <Button fullWidth variant="contained" sx={{ mt: 3, bgcolor: primaryColor, "&:hover": { bgcolor: "#035603" } }} onClick={() => handleActivatePlan(category)}>
                    Activate Plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      <Modal open={checkoutOpen} onClose={() => setCheckoutOpen(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "white", p: 4, borderRadius: 3, width: { xs: 250, md: 400 } }}>
          {selectedPlan && (
            <>
              <Typography variant="h6" gutterBottom>Checkout</Typography>
              <Box sx={{ m: 2 }}>
                <Typography>Category: {selectedPlan.category}</Typography>
                <Typography>Nights: {selectedPlan.nights}</Typography>
                <Typography>People per Room: {selectedPlan.people}</Typography>
                <Typography>Base Price: ₦{selectedPlan.price.toLocaleString()}</Typography>
              </Box>
              <Divider />
              <Box sx={{ m: 1 }}>
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
              <Button fullWidth variant="contained" sx={{ mt: 3, bgcolor: primaryColor, "&:hover": { bgcolor: "#035603" } }} onClick={handlePaystackPayment}>
                Pay with Paystack
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
