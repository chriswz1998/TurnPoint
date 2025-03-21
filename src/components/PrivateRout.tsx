import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext.tsx'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  console.log(user)
  // 如果没有用户信息，重定向到登录页面
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
