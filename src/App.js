import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import SignIn from './pages/Login';
import SignUp from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
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
    <div className="App" style={{margin: 0}}>
      <Routes>
        {/* Public / User Routes wrapped with MainLayout */}
        {!isAdminRoute && (
          <>
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/packages" element={<MainLayout><Package /></MainLayout>} />
            <Route path="/transportation" element={<MainLayout><Transportation /></MainLayout>} />
            <Route path="/tickets" element={<MainLayout><Ticket /></MainLayout>} />
            <Route path="/accomodation" element={<MainLayout><Accomodation /></MainLayout>} />
            <Route path="/accomodation-page" element={<MainLayout><AccomodationPage /></MainLayout>} />
            <Route path="/faqs" element={<MainLayout><Faqs /></MainLayout>} />
            <Route path="/help" element={<MainLayout><Help /></MainLayout>} />
            <Route path="/terms" element={<MainLayout><Terms /></MainLayout>} />
            <Route path="/privacy" element={<MainLayout><Privacy /></MainLayout>} />
            <Route path="/refund" element={<MainLayout><Refund /></MainLayout>} />

            {/* Auth */}
            <Route path="/signin" element={<MainLayout><SignIn /></MainLayout>} />
            <Route path="/signup" element={<MainLayout><SignUp /></MainLayout>} />
            <Route path="/forgot-password" element={<MainLayout><ForgotPassword /></MainLayout>} />
            <Route path="/reset-password" element={<MainLayout><ResetPassword /></MainLayout>} />

            {/* User Dashboard */}
            <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
            <Route path="/reservation" element={<MainLayout><MyReservation /></MainLayout>} />
            <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
            <Route path="/my-tickets" element={<MainLayout><MyTickets /></MainLayout>} />
            <Route path="/my-schedule" element={<MainLayout><MySchedule /></MainLayout>} />
            <Route path="/my-itinerary" element={<MainLayout><MyItinerary /></MainLayout>} />
            <Route path="/support" element={<MainLayout><Support /></MainLayout>} />
            <Route path="/logout" element={<MainLayout><Logout /></MainLayout>} />
          </>
        )}

        {/* Admin routes without MainLayout */}
        {isAdminRoute && <Route path="/admin/*" element={<AdminApp />} />}
      </Routes>
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
