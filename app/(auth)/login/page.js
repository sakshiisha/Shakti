'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/authStore'
import api from '@/lib/axios'

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()

  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  // ✅ REAL BACKEND LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)

    try {
      const { data } = await api.post('/auth/login', form)

      // backend should return { user, token }
      setUser(data.user, data.token)

      router.push('/abhaya')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-2xl overflow-hidden"
      style={{ border: '1px solid rgba(212,160,23,0.3)' }}
    >
      <div
        className="py-3 flex justify-around items-center"
        style={{ background: '#7C1D1D' }}
      >
        {[0,1,2,3,4].map((i) => (
          <div key={i} className="w-4 h-4 rounded-full"
            style={{
              background: 'linear-gradient(to top, #F97316, #D4A017)',
              animation: 'flicker 1.5s ease-in-out infinite',
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="p-8">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2"
            style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
          >ॐ</div>
          <h1 className="text-3xl text-[#1C1008] mb-1"
            style={{ fontFamily: 'Yatra One, cursive' }}
          >SHAKTI</h1>
          <p className="text-[#6B5D4F] text-sm">
            Welcome back — your safety circle awaits
          </p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-[#6B5D4F] uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl text-[#1C1008] text-sm outline-none"
              style={{ background: '#FFF8F0', border: '1px solid rgba(212,160,23,0.3)' }}
              onFocus={(e) => e.target.style.borderColor = '#F97316'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212,160,23,0.3)'}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-medium text-[#6B5D4F] uppercase tracking-wider">
                Password
              </label>
              <Link href="#"
                className="text-xs text-[#F97316] hover:text-[#7C1D1D] transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl text-[#1C1008] text-sm outline-none pr-12"
                style={{ background: '#FFF8F0', border: '1px solid rgba(212,160,23,0.3)' }}
                onFocus={(e) => e.target.style.borderColor = '#F97316'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(212,160,23,0.3)'}
              />
              <button type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-[#FDF6EC] font-medium text-base transition-all duration-300 hover:scale-105 disabled:opacity-70"
            style={{ background: loading ? '#EDE4D4' : '#F97316' }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"
                  style={{ animation: 'rotate-slow 1s linear infinite' }}
                />
                Signing in...
              </span>
            ) : 'Sign In to SHAKTI'}
          </button>
        </form>

        <p className="text-center text-sm text-[#6B5D4F] mt-6">
          New to SHAKTI?{' '}
          <Link href="/register"
            className="text-[#F97316] font-medium hover:text-[#7C1D1D] transition-colors"
          >
            Create your account →
          </Link>
        </p>
      </div>

      <div className="h-1"
        style={{ background: 'linear-gradient(to right, #7C1D1D, #D4A017, #F97316, #D4A017, #7C1D1D)' }}
      />
    </div>
  )
}