import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // ✅ Import AuthProvider

import Home from './pages/Home';
import SignIn from './pages/Login';
import SignUp from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import Footer from './component/Footer';
import Navbar from './component/Navbar';
import Accomodation from './pages/Accomodation';
import AccomodationPage from './pages/AccomodationPage';
import Package from './pages/Packages';
import Transportation from './pages/Transportation';
import Ticket from './pages/Ticket';
import Faqs from './pages/Faqs';
import Help from './pages/Help';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
// Dashboard Routes
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Dashboard/Profile';
import MyPackage from './pages/Dashboard/MyPackage';
import MySchedule from './pages/Dashboard/MySchedule';
import MyTickets from './pages/Dashboard/MyTickets';
import MyReservation from './pages/Dashboard/MyReservation';
import MyItinerary from './pages/Dashboard/MyItinerary';
import Support from './pages/Dashboard/Support';
import Logout from './pages/Dashboard/Logout';
// Admin
import AdminApp from './admin/AdminApp';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Package />} />
        <Route path="/transportation" element={<Transportation />} />
        <Route path="/tickets" element={<Ticket />} />
        <Route path="/accomodation" element={<Accomodation />} />
        <Route path="/accomodation-page" element={<AccomodationPage />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/help" element={<Help />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />

        {/* Auth */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/my-schedule" element={<MySchedule />} />
        <Route path="/my-package" element={<MyPackage />} />
        <Route path="/reservation" element={<MyReservation />} />
        <Route path="/my-itinerary" element={<MyItinerary />} />
        <Route path="/support" element={<Support />} />
        <Route path="/logout" element={<Logout />} />

        {/* Admin */}
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
