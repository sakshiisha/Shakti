'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/axios'
import { requestNotificationPermission, onForegroundMessage } from '@/lib/firebase'

export default function EmergencyButton({ location }) {
  const [pressed,  setPressed]  = useState(false)
  const [sent,     setSent]     = useState(false)
  const [alertId,  setAlertId]  = useState(null)
  const [error,    setError]    = useState('')
  const [resolved, setResolved] = useState(false)

  // FCM setup
  useEffect(() => {
    const setup = async () => {
      const token = await requestNotificationPermission()
      if (token) {
        try { await api.post('/emergency/save-fcm-token', { token }) } catch {}
      }
    }
    setup()

    const unsub = onForegroundMessage((payload) => {
      const { title, body } = payload.notification || {}
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        new Notification(title || '🆘 SHAKTI', { body, icon: '/icon-192.png' })
      }
    })
    return () => { if (typeof unsub === 'function') unsub() }
  }, [])

  const handleSOS = async () => {
    if (pressed) return
    setPressed(true)
    setError('')
    try {
      const { data } = await api.post('/emergency/sos', {
        lat:     location?.lat || 0,
        lng:     location?.lng || 0,
        address: 'Current location',
        area:    'Nearby area',
      })
      setAlertId(data.alertId)
      setSent(true)
      setResolved(false)
    } catch {
      setError('SOS failed — call 112 directly')
    } finally {
      setPressed(false)
    }
  }

  const handleResolve = async () => {
    if (!alertId) { setSent(false); return }
    try {
      await api.put(`/emergency/resolve/${alertId}`)
      setResolved(true)
      setTimeout(() => { setSent(false); setResolved(false); setAlertId(null) }, 2000)
    } catch {
      setSent(false)
    }
  }

  return (
    <div className="rounded-2xl p-4 sm:p-6 text-center relative overflow-hidden w-full max-w-md mx-auto"
      style={{ background: '#5C1F1F', border: '1px solid rgba(245,200,66,0.2)' }}
    >
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full"
            style={{
              background:     '#FFF8F0',
              top:            `${(i * 37 + 11) % 100}%`,
              left:           `${(i * 53 + 7)  % 100}%`,
              opacity:        0.3,
              animation:      'twinkle 3s ease-in-out infinite',
              animationDelay: `${(i * 0.3) % 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {sent ? (
          <div className="py-4">
            <div className="text-5xl mb-3">{resolved ? '✅' : '🆘'}</div>
            <p className="text-lg font-medium mb-1"
              style={{ color: '#F5C842', fontFamily: 'Yatra One, cursive' }}
            >
              {resolved ? 'You are safe now' : 'Help is on the way!'}
            </p>
            <p className="text-xs mb-5" style={{ color: 'rgba(255,248,240,0.7)' }}>
              {resolved
                ? 'Alert resolved. Stay safe.'
                : 'Alert sent to emergency contact. Notifications dispatched.'}
            </p>
            {!resolved && (
              <button onClick={handleResolve}
                className="px-5 py-2 rounded-xl text-sm font-medium mb-3"
                style={{ background: '#2D6A4F', color: 'white' }}
              >
                ✅ I am Safe Now
              </button>
            )}
            <br />
            <button onClick={() => setSent(false)}
              className="px-4 py-2 rounded-lg text-xs mt-2"
              style={{ background: 'rgba(255,248,240,0.1)', color: '#FFF8F0' }}
            >
              Reset
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-around mb-6">
              {[0,1,2,3,4].map((i) => (
                <div key={i} className="w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                  style={{
                    background:     'linear-gradient(to top, #F4A7B9, #F5C842)',
                    animation:      'flicker 1.5s ease-in-out infinite',
                    animationDelay: `${i * 0.3}s`,
                    filter:         'drop-shadow(0 0 6px rgba(245,200,66,0.6))',
                  }}
                />
              ))}
            </div>

            <div className="relative inline-block mb-4">
              {[0, 0.5, 1].map((delay) => (
                <div key={delay} className="absolute inset-0 rounded-full"
                  style={{
                    border:         '1px solid rgba(244,167,185,0.3)',
                    animation:      'ripple 2s ease-out infinite',
                    animationDelay: `${delay}s`,
                  }}
                />
              ))}
              <button
                onClick={handleSOS}
                disabled={pressed}
                className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 transition-all duration-150 active:scale-95 disabled:opacity-70"
                style={{
                  background:  pressed
                    ? 'linear-gradient(135deg, #3A0D0D, #2A0808)'
                    : 'linear-gradient(135deg, #9B1C1C, #7C1515)',
                  borderColor: 'rgba(255,248,240,0.4)',
                  boxShadow:   '0 0 50px rgba(244,167,185,0.4)',
                }}
              >
                <div className="text-4xl sm:text-5xl mb-1">🆘</div>
                <div className="text-sm font-medium"
                  style={{ color: '#FFF8F0', fontFamily: 'Yatra One, cursive' }}
                >
                  {pressed ? '...' : 'SOS'}
                </div>
              </button>
            </div>

            <p className="text-base font-medium mb-1"
              style={{ color: '#FFF8F0', fontFamily: 'Yatra One, cursive' }}
            >
              {pressed ? 'Sending alert...' : 'Press for Emergency Help'}
            </p>
            <p className="text-xs mb-4" style={{ color: 'rgba(255,248,240,0.6)' }}>
              Instantly alerts emergency contact + nearby women
            </p>

            {error && (
              <p className="text-xs mb-3" style={{ color: '#F09595' }}>{error}</p>
            )}

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { icon: '📍', label: 'GPS' },
                { icon: '📱', label: 'SMS' },
                { icon: '🔔', label: 'Push Alert' },
              ].map((f) => (
                <div key={f.label} className="text-center">
                  <div className="text-xl mb-1">{f.icon}</div>
                  <div className="text-[10px]" style={{ color: 'rgba(255,248,240,0.7)' }}>{f.label}</div>
                </div>
              ))}
            </div>

            <a href="tel:112"
              className="block w-full py-3 rounded-xl text-center text-sm font-medium"
              style={{ background: '#7C1D1D', color: 'white' }}
            >
              📞 Call Police — 112
            </a>
          </>
        )}
      </div>
    </div>
  )
}