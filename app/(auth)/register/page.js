'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/authStore'
import api from '@/lib/axios'

const STEPS = ['Basic Info', 'Contact & Safety', 'Preferences']

export default function RegisterPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    emergencyContact: '',
    emergencyName: '',
    city: '',
    agreeTerms: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
    setError('')
  }

  const getPasswordStrength = () => {
    const p = form.password
    if (!p) return { score: 0, label: '', color: '' }
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    const map = [
      { label: '', color: '' },
      { label: 'Weak', color: '#E24B4A' },
      { label: 'Fair', color: '#F97316' },
      { label: 'Good', color: '#D4A017' },
      { label: 'Strong', color: '#2D6A4F' },
    ]
    return { score, ...map[score] }
  }

  const validateStep = () => {
    if (step === 0) {
      if (!form.fullName.trim()) return 'Please enter your full name.'
      if (!form.email.trim()) return 'Please enter your email address.'
      if (!/\S+@\S+\.\S+/.test(form.email)) return 'Please enter a valid email.'
      if (!form.password) return 'Please create a password.'
      if (form.password.length < 8) return 'Password must be at least 8 characters.'
    }
    if (step === 1) {
      if (!form.phone.trim()) return 'Please enter your phone number.'
      if (!form.emergencyContact.trim()) return 'Please add an emergency contact number.'
      if (!form.emergencyName.trim()) return 'Please enter emergency contact name.'
    }
    if (step === 2) {
      if (!form.agreeTerms) return 'Please agree to the terms to continue.'
    }
    return ''
  }

  const handleNext = () => {
    const err = validateStep()
    if (err) { setError(err); return }
    if (step < 2) {
      setStep(step + 1)
      setError('')
    } else {
      handleSubmit()
    }
  }

  // ✅ REAL BACKEND REGISTER
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const { data } = await api.post('/auth/register', {
        fullName: form.fullName,
        email:    form.email,
        password: form.password,
        phone:    form.phone,
        city:     form.city,
        emergencyContact: {
          name:  form.emergencyName,
          phone: form.emergencyContact,
        },
      })

      setUser(data.user, data.token)
      router.push('/abhaya')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
      setLoading(false)
    }
  }

  const strength = getPasswordStrength()

  return (
    <div
      className="bg-white rounded-2xl shadow-2xl overflow-hidden"
      style={{ border: '1px solid rgba(212,160,23,0.3)' }}
    >
      {/* Top maroon bar */}
      <div className="py-3 flex justify-around items-center" style={{ background: '#7C1D1D' }}>
        {[0,1,2,3,4].map((i) => (
          <div key={i} className="w-4 h-4 rounded-full"
            style={{
              background: 'linear-gradient(to top, #F97316, #D4A017)',
              animation: 'flicker 1.5s ease-in-out infinite',
              animationDelay: `${i * 0.3}s`,
              filter: 'drop-shadow(0 0 6px rgba(249,115,22,0.8))'
            }}
          />
        ))}
      </div>

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>ॐ</div>
          <h1 className="text-3xl text-[#1C1008] mb-1" style={{ fontFamily: 'Yatra One, cursive' }}>
            Join SHAKTI
          </h1>
          <p className="text-[#6B5D4F] text-sm">Your safety journey starts here</p>
        </div>

        {/* Step indicator */}
        <div className="flex gap-2 mb-6">
          {STEPS.map((label, i) => (
            <div key={i} className="flex-1">
              <div className="h-1.5 rounded-full mb-1 transition-all duration-300"
                style={{ background: i < step ? '#2D6A4F' : i === step ? '#F97316' : '#EDE4D4' }}
              />
              <p className="text-center text-xs transition-colors duration-200"
                style={{ color: i === step ? '#F97316' : i < step ? '#2D6A4F' : '#6B5D4F' }}
              >
                {i < step ? '✓ ' : ''}{label}
              </p>
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* STEP 0 */}
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#6B5D4F] uppercase tracking-wider mb-2">Full Name</label>
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
                placeholder="Priya Sharma"
                className="w-full px-4 py-3 rounded-xl text-[#1C1008] text-sm outline-none"
                style={{ background: '#FFF8F0', border: '1px solid rgba(212,160,23,0.3)' }}
                onFocus={(e) => e.target.style.borderColor = '#F97316'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(212,160,23,0.3)'}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B5D4F] uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="priya@email.com"
                className="w-full px-4 py-3 rounded-xl text-[#1C1008] text-sm outline-none"
                style={{ background: '#FFF8F0', border: '1px solid rgba(212,160,23,0.3)' }}
                onFocus={(e) => e.target.style.borderColor = '#F97316'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(212,160,23,0.3)'}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B5D4F] uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password" value={form.password} onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 rounded-xl text-[#1C1008] text-sm outline-none pr-12"
                  style={{ background: '#FFF8F0', border: '1px solid rgba(212,160,23,0.3)' }}
                  onFocus={(e) => e.target.style.borderColor = '#F97316'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(212,160,23,0.3)'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{ background: i <= strength.score ? strength.color : '#EDE4D4' }}
                      />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: strength.color }}>{strength.label} password</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#6B5D4F] uppercase tracking-wider mb-2">Your Phone Number</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl text-[#1C1008] text-sm outline-none"
                style={{ background: '#FFF8F0', border: '1px solid rgba(212,160,23,0.3)' }}
                onFocus={(e) => e.target.style.borderColor = '#F97316'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(212,160,23,0.3)'}
              />
              <p className="text-xs text-[#6B5D4F] mt-1">SOS alerts will be sent from this number</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B5D4F] uppercase tracking-wider mb-2">Emergency Contact Name</label>
              <input type="text" name="emergencyName" value={form.emergencyName} onChange={handleChange}
                placeholder="Mom / Brother / Best Friend"
                className="w-full px-4 py-3 rounded-xl text-[#1C1008] text-sm outline-none"
                style={{ background: '#FFF8F0', border: '1px solid rgba(212,160,23,0.3)' }}
                onFocus={(e) => e.target.style.borderColor = '#F97316'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(212,160,23,0.3)'}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B5D4F] uppercase tracking-wider mb-2">Emergency Contact Number</label>
              <input type="tel" name="emergencyContact" value={form.emergencyContact} onChange={handleChange}
                placeholder="+91 98765 00000"
                className="w-full px-4 py-3 rounded-xl text-[#1C1008] text-sm outline-none"
                style={{ background: '#FFF8F0', border: '1px solid rgba(212,160,23,0.3)' }}
                onFocus={(e) => e.target.style.borderColor = '#F97316'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(212,160,23,0.3)'}
              />
              <p className="text-xs text-[#6B5D4F] mt-1">This person gets an alert when you press SOS</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B5D4F] uppercase tracking-wider mb-2">Your City</label>
              <input type="text" name="city" value={form.city} onChange={handleChange}
                placeholder="Delhi, Mumbai, Bangalore..."
                className="w-full px-4 py-3 rounded-xl text-[#1C1008] text-sm outline-none"
                style={{ background: '#FFF8F0', border: '1px solid rgba(212,160,23,0.3)' }}
                onFocus={(e) => e.target.style.borderColor = '#F97316'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(212,160,23,0.3)'}
              />
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-xl p-4 space-y-2"
              style={{ background: '#FFF8F0', border: '1px solid rgba(212,160,23,0.3)' }}
            >
              <p className="text-xs font-medium text-[#6B5D4F] uppercase tracking-wider mb-3">Account Summary</p>
              {[
                { label: 'Name',              value: form.fullName },
                { label: 'Email',             value: form.email },
                { label: 'Phone',             value: form.phone },
                { label: 'Emergency Contact', value: `${form.emergencyName} — ${form.emergencyContact}` },
                { label: 'City',              value: form.city || 'Not provided' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-[#6B5D4F]">{item.label}</span>
                  <span className="text-[#1C1008] font-medium truncate max-w-[180px]">{item.value || '—'}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[
                { icon: '🛡', text: 'Real-time safety zone alerts' },
                { icon: '🌸', text: 'Period tracker & mood check-in' },
                { icon: '🔒', text: 'Private space with doctor support' },
                { icon: '👥', text: 'Community safety network' },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-3 px-3 py-2 rounded-lg"
                  style={{ background: '#FFF8F0' }}
                >
                  <span className="text-base">{f.icon}</span>
                  <span className="text-sm text-[#1C1008]">{f.text}</span>
                  <span className="ml-auto text-[#2D6A4F] text-xs">✓</span>
                </div>
              ))}
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="agreeTerms" checked={form.agreeTerms}
                onChange={handleChange} className="mt-0.5 w-4 h-4 accent-orange-500"
              />
              <span className="text-sm text-[#6B5D4F] leading-relaxed">
                I agree to the{' '}
                <span className="text-[#F97316] font-medium cursor-pointer">Terms of Service</span>
                {' '}and{' '}
                <span className="text-[#F97316] font-medium cursor-pointer">Privacy Policy</span>.
                My data is safe and protected.
              </span>
            </label>
          </div>
        )}

        {/* Buttons */}
        <div className={`flex gap-3 mt-6 ${step > 0 ? 'flex-row' : ''}`}>
          {step > 0 && (
            <button onClick={() => { setStep(step - 1); setError('') }}
              className="flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-md"
              style={{ border: '1px solid rgba(212,160,23,0.4)', color: '#7C1D1D', background: '#FFF8F0' }}
            >
              ← Back
            </button>
          )}
          <button onClick={handleNext} disabled={loading}
            className="flex-1 py-3 rounded-xl text-[#FDF6EC] font-medium text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-70"
            style={{ background: loading ? '#EDE4D4' : '#F97316' }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"
                  style={{ animation: 'rotate-slow 1s linear infinite' }}
                />
                Creating account...
              </span>
            ) : step === 2 ? 'Create My Account 🌸' : 'Continue →'}
          </button>
        </div>

        {step === 0 && (
          <>
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[#D4A017]/20" />
              <span className="text-xs text-[#6B5D4F]">or sign up with</span>
              <div className="flex-1 h-px bg-[#D4A017]/20" />
            </div>
            <button className="w-full py-3 rounded-xl text-[#1C1008] text-sm font-medium transition-all duration-200 hover:shadow-md flex items-center justify-center gap-3"
              style={{ border: '1px solid rgba(212,160,23,0.4)', background: '#FFF8F0' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </>
        )}

        <p className="text-center text-sm text-[#6B5D4F] mt-5">
          Already have an account?{' '}
          <Link href="/login" className="text-[#F97316] font-medium hover:text-[#7C1D1D] transition-colors">
            Sign in →
          </Link>
        </p>
      </div>

      <div className="h-1" style={{ background: 'linear-gradient(to right, #7C1D1D, #D4A017, #F97316, #D4A017, #7C1D1D)' }} />
    </div>
  )
}