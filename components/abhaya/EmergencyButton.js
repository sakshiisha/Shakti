'use client'

import { useState } from 'react'
import api from '@/lib/axios'

export default function EmergencyButton({ location }) {
  const [pressed, setPressed] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')

  const handleSOS = async () => {
    setPressed(true)
    setError('')
    try {
      await api.post('/emergency/sos', {
        lat:     location?.lat || 0,
        lng:     location?.lng || 0,
        address: 'Current location',
        area:    'Nearby area',
      })
      setSent(true)
    } catch (err) {
      setError('SOS failed — please call 112 directly')
    } finally {
      setPressed(false)
    }
  }

  return (
    <div className="rounded-2xl p-6 text-center relative overflow-hidden"
      style={{ background: '#5C1F1F', border: '1px solid rgba(245,200,66,0.2)' }}
    >
      {/* Twinkling stars bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full"
            style={{
              background: '#FFF8F0',
              top:  `${(i * 37 + 11) % 100}%`,
              left: `${(i * 53 + 7)  % 100}%`,
              opacity: 0.3,
              animation: 'twinkle 3s ease-in-out infinite',
              animationDelay: `${(i * 0.3) % 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {sent ? (
          <div className="py-4">
            <div className="text-5xl mb-3">✅</div>
            <p className="text-lg font-medium mb-1"
              style={{ color: '#F5C842', fontFamily: 'Yatra One, cursive' }}
            >
              Help is on the way!
            </p>
            <p className="text-xs mb-4" style={{ color: 'rgba(255,248,240,0.7)' }}>
              Alert sent to your emergency contact + police
            </p>
            <button onClick={() => setSent(false)}
              className="px-4 py-2 rounded-lg text-xs"
              style={{ background: 'rgba(255,248,240,0.1)', color: '#FFF8F0' }}
            >
              Reset
            </button>
          </div>
        ) : (
          <>
            {/* Diya row */}
            <div className="flex justify-around mb-6">
              {[0,1,2,3,4].map((i) => (
                <div key={i} className="w-5 h-5 rounded-full"
                  style={{
                    background: 'linear-gradient(to top, #F4A7B9, #F5C842)',
                    animation: 'flicker 1.5s ease-in-out infinite',
                    animationDelay: `${i * 0.3}s`,
                    filter: 'drop-shadow(0 0 6px rgba(245,200,66,0.6))',
                  }}
                />
              ))}
            </div>

            {/* SOS Button */}
            <div className="relative inline-block mb-4">
              {[0, 0.5, 1].map((delay) => (
                <div key={delay} className="absolute inset-0 rounded-full"
                  style={{
                    border: '1px solid rgba(244,167,185,0.3)',
                    animation: 'ripple 2s ease-out infinite',
                    animationDelay: `${delay}s`,
                  }}
                />
              ))}
              <button onMouseDown={handleSOS} disabled={pressed}
                className="relative w-32 h-32 rounded-full border-4 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-70"
                style={{
                  background: pressed
                    ? 'linear-gradient(135deg, #3A0D0D, #2A0808)'
                    : 'linear-gradient(135deg, #7C1F1F, #5C1515)',
                  borderColor: 'rgba(255,248,240,0.3)',
                  boxShadow: '0 0 40px rgba(244,167,185,0.3)',
                }}
              >
                <div className="text-4xl mb-0.5">🆘</div>
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
              Sends your location to emergency contact + police
            </p>

            {error && (
              <p className="text-xs mb-3" style={{ color: '#F09595' }}>{error}</p>
            )}

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '📍', label: 'GPS Location' },
                { icon: '📱', label: 'SMS Alert'    },
                { icon: '🚔', label: 'Police Alert' },
              ].map((f) => (
                <div key={f.label} className="text-center">
                  <div className="text-xl mb-1">{f.icon}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,248,240,0.7)' }}>
                    {f.label}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}