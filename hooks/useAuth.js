'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/authStore'
import api from '@/lib/axios'

export default function useAuth({ redirectIfLoggedIn = false } = {}) {
  const router               = useRouter()
  const { user, isLoggedIn, setUser, logout } = useAuthStore()

  // Redirect agar logged in nahi hai
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [isLoggedIn])

  // Redirect agar logged in hai (login/register page ke liye)
  useEffect(() => {
    if (redirectIfLoggedIn && isLoggedIn) {
      router.push('/abhaya')
    }
  }, [isLoggedIn, redirectIfLoggedIn])

  // Token verify karo backend se
  const verifyToken = async () => {
    try {
      const { data } = await api.get('/auth/me')
      setUser(data.user, localStorage.getItem('shakti_token'))
    } catch (err) {
      logout()
      router.push('/login')
    }
  }

  return { user, isLoggedIn, logout, verifyToken }
}