import { createBrowserRouter, Navigate } from 'react-router-dom'
import OverviewPage from '@/pages/Dashboard/Overview'
import ProtectedRoute from './ProtectedRoute'
import DashboardLayout from '@/Layout/DashboardLayout'
import LoginPage from '@/pages/auth/Login'
import ProductsPage from '@/pages/Dashboard/Product'
import UserPage from '@/pages/Dashboard/User'
import AnalyticsPage from '@/pages/Dashboard/analytics'


export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <OverviewPage />,
          },
          { path: 'users',     element: <UserPage /> },
          { path: 'analytics', element: <AnalyticsPage /> },
          { path: 'products',  element: <ProductsPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
])