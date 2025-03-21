import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '@/lib/use-http.ts' // 假设你的 useFetch 是用来请求数据的 Hook
enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
export interface UserProps {
  id: string
  email: string
  password: string
  name: string
  avatar: string
  role: Role
  createdAt: Date
}
interface AuthContextType {
  user: UserProps | null // 用户信息的类型
  loading: boolean // 加载状态
}

// 创建上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// AuthProvider 组件
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null) // 用户信息的状态
  const [loading, setLoading] = useState<boolean>(true) // 加载状态
  const navigate = useNavigate()

  // 使用自定义 Hook `useFetch` 来发起请求
  const { fetchData } = useFetch()

  useEffect(() => {
    const token = localStorage.getItem('access_token') // 从 localStorage 获取 token
    if (token) {
      // 如果 token 存在，获取用户信息
      fetchUserInfo()
    } else {
      setLoading(false) // 如果没有 token，直接设置加载为 false
    }
  }, [navigate])

  // 获取用户信息的函数
  const fetchUserInfo = async () => {
    try {
      const data = await fetchData('auth/user', 'GET')
      setUser(data) // 将用户数据设置到 state 中
    } catch (error) {
      navigate('/login') // 如果请求失败，跳转到登录页面
    } finally {
      setLoading(false) // 请求完成后，设置加载为 false
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// 用于获取 AuthContext 的自定义 hook
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
