'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import useAuthStore from '@/store/authStore'

export default function DashboardLayout({ children }) {
  const router   = useRouter()
  const pathname = usePathname()
  const { isLoggedIn, user } = useAuthStore()

  // Hydration fix — server pe mounted nahi hai
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.push('/login')
    }
  }, [isLoggedIn, mounted, router])

  // Server render pe kuch mat dikhao
  if (!mounted) return null
  if (!isLoggedIn) return null

  const navLinks = [
    { href: '/abhaya',      label: 'Abhaya',      emoji: '🛡' },
    { href: '/sakhi',       label: 'Sakhi',       emoji: '🌸' },
    { href: '/gupt-mandir', label: 'Gupt Mandir', emoji: '🔒' },
  ]

  const isActive = (href) => pathname === href

  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDF6EC]"
        style={{ borderBottom: '2px solid rgba(212,160,23,0.25)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl"
              style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
            >ॐ</span>
            <span className="text-xl text-[#1C1008]"
              style={{ fontFamily: 'Yatra One, cursive' }}
            >SHAKTI</span>
          </Link>

          <div className="flex items-center gap-2">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: isActive(item.href) ? '#F97316' : 'transparent',
                  color:      isActive(item.href) ? '#FDF6EC' : '#1C1008',
                }}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium text-[#FDF6EC]"
              style={{ background: '#F97316' }}
            >
              {user?.fullName?.charAt(0).toUpperCase() || 'P'}
            </div>
            <button
              onClick={() => {
                useAuthStore.getState().logout()
                router.push('/login')
              }}
              className="text-xs px-3 py-1.5 rounded-lg"
              style={{ border: '1px solid rgba(124,29,29,0.3)', color: '#7C1D1D' }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex justify-around px-6 pb-2">
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
      </nav>

      <main className="pt-24 pb-20 md:pb-6">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{ background: '#FDF6EC', borderTop: '1px solid rgba(212,160,23,0.25)' }}
      >
        <div className="flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href}
              className="flex-1 flex flex-col items-center gap-1 py-3"
              style={{
                color:     isActive(item.href) ? '#F97316' : '#6B5D4F',
                borderTop: isActive(item.href) ? '2px solid #F97316' : '2px solid transparent',
              }}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}