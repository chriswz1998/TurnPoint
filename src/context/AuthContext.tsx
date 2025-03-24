import React, { createContext, useState, ReactNode } from 'react'
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
  setUser: (user: UserProps) => void
}

// 创建上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// AuthProvider 组件
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null) // 用户信息的状态

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
