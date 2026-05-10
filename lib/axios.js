import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // ⭐ VERY IMPORTANT for CORS + cookies
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach token automatically
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('shakti_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Auto logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined' && error.response?.status === 401) {
      localStorage.removeItem('shakti_token')
      localStorage.removeItem('shakti_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api