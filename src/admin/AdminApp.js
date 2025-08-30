// src/admin/AdminApp.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from '../context/AdminAuthContext';

// Auth
import AdminLogin from './pages/AdminLogin';
// pages
import Dashboard from './pages/Dashboard';
import ManageUser from './pages/ManageUser';
import Packages from './pages/Packages';
import ManageFees from './pages/ManageFees';
import Reservation from './pages/Reservation';
import Settings from './pages/Settings';
import Faqs from './pages/Faqs';
import Support from './pages/Support';



export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="manage-users" element={<ManageUser />} />
        <Route path="packages" element={<Packages />} />
        <Route path="manage-fees" element={<ManageFees />} />
        <Route path="reservations" element={<Reservation />} />
        <Route path="support" element={<Support />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="settings" element={<Settings />} />
        {/* You can add more admin routes here later */}
      </Routes>
    </AdminAuthProvider>
  );
}
