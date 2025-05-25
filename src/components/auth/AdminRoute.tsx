import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children, requireSuperAdmin = false }) => {
  const { currentUser, isAdmin, isSuperAdmin } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // For routes that require superadmin access
  if (requireSuperAdmin && !isSuperAdmin()) {
    return <Navigate to="/" replace />;
  }

  // For regular admin routes
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute; 