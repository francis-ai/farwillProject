// src/admin/AdminApp.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import admin pages
import Login from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import ManageUser from './pages/ManageUser';
import Packages from './pages/Packages';
import Settings from './pages/Settings';
import Faqs from './pages/Faqs';
import Support from './pages/Support'



export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="manage-users" element={<ManageUser />} />
      <Route path="packages" element={<Packages />} />
      <Route path="support" element={<Support />} />
      <Route path="faqs" element={<Faqs />} />
      <Route path="settings" element={<Settings />} />
      {/* You can add more admin routes here later */}
    </Routes>
  );
}
