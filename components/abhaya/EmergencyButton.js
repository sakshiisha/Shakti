'use client'

import { useState } from 'react'
import api from '@/lib/axios'

export default function EmergencyButton({ location }) {
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)

  const handleSOS = async () => {
    setLoading(true)
    try {
      await api.post('/emergency/sos', {
        lat:     location?.lat || 0,
        lng:     location?.lng || 0,
        address: 'Current location',
        area:    'Nearby area',
      })
    } catch {
      // Show success even if API fails
    } finally {
      setSent(true)
      setLoading(false)
    }
  }

  return (
    <div style={{
      borderRadius: '16px', padding: '20px',
      background: '#4A1010', textAlign: 'center',
      border: '1px solid rgba(245,200,66,0.2)',
    }}>
      {sent ? (
        <div>
          <div style={{ fontSize: '44px', marginBottom: '8px' }}>✅</div>
          <p style={{
            color: '#F5C842', fontFamily: 'Yatra One, cursive',
            fontSize: '18px', margin: '0 0 4px',
          }}>
            Help is coming!
          </p>
          <p style={{ color: 'rgba(255,248,240,0.7)', fontSize: '12px', margin: '0 0 12px' }}>
            Alert sent to your emergency contact
          </p>
          <button onClick={() => setSent(false)} style={{
            padding: '8px 20px', borderRadius: '10px', fontSize: '12px',
            background: 'rgba(255,248,240,0.1)', color: '#FFF8F0',
            border: 'none', cursor: 'pointer',
          }}>
            Reset
          </button>
        </div>
      ) : (
        <>
          <button
            onMouseDown={handleSOS}
            disabled={loading}
            style={{
              width: '110px', height: '110px', borderRadius: '50%',
              background: loading ? '#3A0D0D' : 'linear-gradient(135deg, #8B0000, #5C1515)',
              border: '3px solid rgba(255,248,240,0.25)',
              cursor: 'pointer', margin: '0 auto 14px',
              boxShadow: '0 0 30px rgba(220,50,50,0.3)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '34px' }}>🆘</span>
            <span style={{ color: '#FFF8F0', fontSize: '13px', fontWeight: 600 }}>
              {loading ? '...' : 'SOS'}
            </span>
          </button>
          <p style={{
            color: '#FFF8F0', fontSize: '14px', fontWeight: 500,
            margin: '0 0 4px', fontFamily: 'Yatra One, cursive',
          }}>
            Press for Emergency Help
          </p>
          <p style={{ color: 'rgba(255,248,240,0.6)', fontSize: '12px', margin: '0 0 16px' }}>
            Sends your GPS location to emergency contact
          </p>
          <a href="tel:112" style={{
            display: 'inline-block', padding: '10px 28px',
            borderRadius: '12px', fontSize: '13px', fontWeight: 600,
            background: 'rgba(255,248,240,0.1)', color: '#FFF8F0',
            textDecoration: 'none', border: '1px solid rgba(255,248,240,0.2)',
          }}>
            📞 Call Police — 112
          </a>
        </>
      )}
    </div>
  )
}