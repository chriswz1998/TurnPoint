import { useState } from 'react'
import toast from 'react-hot-toast'
import { fetch } from '@tauri-apps/plugin-http'
import { useNavigate } from 'react-router-dom'

// const base_url = 'http://192.168.31.174:3000'
const base_url = 'http://localhost:3000'
const local_token = localStorage.getItem('access_token')
// @ts-ignore
const useFetch = <IP, OP>() => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<OP | null>(null)
  const navigate = useNavigate()

  const fetchData = async <IP, OP>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body: IP | null = null,
    headers: Record<string, string> = {}
  ): Promise<OP | null> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${base_url}/${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: local_token ? `Bearer ${local_token}` : '',
          ...headers // 扩展用户传递的headers
        },
        body: body ? JSON.stringify(body) : null
      })

      const result = await response.json()
      if (response.ok) {
        setData(result)
        return result
      } else {
        setError(result.message || 'Something went wrong')
        toast.error(result.message || 'Something went wrong')
        if (result.statusCode === 401) {
          navigate('/login')
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

    return null // 在出现错误时返回 null
  }

  return { loading, error, data, fetchData }
}

export default useFetch
