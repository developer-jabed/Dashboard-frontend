
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/auth-store'

export default function ProtectedRoute() {
  const { isAuthenticated, token } = useAuthStore()
  const location = useLocation()


  if (location.pathname === '/login') {
    if (isAuthenticated && token) {
      return <Navigate to="/dashboard" replace />
    }
    return <Outlet />
  }


  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}