import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import useUserContext from '../hooks/useSessionContext'

type Props = {
  isAdminRoute?: boolean
  redirectTo?: string
  children?: React.ReactNode
}

export default function ProtectedRoute({
  isAdminRoute = false,
  redirectTo = '/login',
  children
}: Props): React.ReactNode {
  const { user, loading } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate(redirectTo)
    }
    if (!loading && isAdminRoute && user?.role !== 'admin') {
      navigate('/dashboard')
    }
  }, [])

  return children ? children : <Outlet />
}
