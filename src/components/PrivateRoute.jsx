import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
/* firebase */
import { useAuth } from '../contexts/AuthContext';

export const PrivateRoute = () => {
   const { user } = useAuth();
   /* validate is any user is active */
   return user ? <Outlet /> : <Navigate to="/login" />
}