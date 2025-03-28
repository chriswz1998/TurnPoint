import React, { createContext, useState, ReactNode, useEffect } from 'react'
import useHttp from '@/lib/use-http.ts'

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
  user: UserProps | null
  loading: boolean
  setUser: (user: UserProps) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null)
  const [loading, setLoading] = useState(true)
  const { fetchData } = useHttp()
  useEffect(() => {
    reLogin()
  }, [])

  const reLogin = async () => {
    const token = localStorage.getItem('access_token')

    if (token) {
      const payload = (await fetchData('auth/userinfo').finally(() =>
        setLoading(false)
      )) as unknown as UserProps
      setUser(payload)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
