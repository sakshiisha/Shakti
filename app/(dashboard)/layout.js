'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import useAuthStore from '@/store/authStore'

export default function DashboardLayout({ children }) {
  const router   = useRouter()
  const pathname = usePathname()
  const { isLoggedIn, user } = useAuthStore()

  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (mounted && !isLoggedIn) router.push('/login')
  }, [isLoggedIn, mounted, router])

  if (!mounted || !isLoggedIn) return null

  const navLinks = [
    { href: '/abhaya', label: 'Abhaya', emoji: '🛡' },
    { href: '/sakhi', label: 'Sakhi', emoji: '🌸' },
    { href: '/gupt-mandir', label: 'Gupt Mandir', emoji: '🔒' },
  ]

  const isActive = (href) => pathname === href

  return (
    <div className="min-h-screen bg-[#FDF6EC]">

      {/* TOP NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[9999] bg-[#FDF6EC]"
  style={{ borderBottom: '2px solid rgba(212,160,23,0.25)' }}
>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/abhaya" className="flex items-center gap-2">
            <span className="text-2xl">ॐ</span>
            <span className="text-lg sm:text-xl text-[#1C1008]" style={{ fontFamily: 'Yatra One, cursive' }}>
              SHAKTI
            </span>
          </Link>

          {/* DESKTOP NAV (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: isActive(item.href) ? '#F97316' : 'transparent',
                  color: isActive(item.href) ? '#FDF6EC' : '#1C1008',
                }}
              >
                {item.emoji} {item.label}
              </Link>
            ))}
          </div>

          {/* USER */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium text-white bg-orange-500">
              {user?.fullName?.charAt(0).toUpperCase() || 'P'}
            </div>

            <button
              onClick={() => {
                useAuthStore.getState().logout()
                router.push('/login')
              }}
              className="text-xs px-3 py-1.5 rounded-lg border border-red-300 text-red-700"
            >
              Logout
            </button>
          </div>

        </div>
      </nav>

      {/* PAGE CONTENT — ✅ OVERLAP FIX */}
      <main
  className="pt-20 pb-20 md:pb-6"
  style={{ overflowX: 'hidden', overflowY: 'auto' }}
>
  {children}
</main>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#FDF6EC] border-t border-orange-200">
        <div className="flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href}
              className="flex-1 flex flex-col items-center gap-1 py-3"
              style={{
                color: isActive(item.href) ? '#F97316' : '#6B5D4F',
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