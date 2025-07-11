import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminPage = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
};

export default AdminPage;