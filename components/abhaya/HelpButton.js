'use client'

import { useState } from 'react'
import api from '@/lib/axios'

export default function HelpButton({ location }) {
  const [open,    setOpen]    = useState(false)
  const [text,    setText]    = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)

  const handleSend = async () => {
    if (!text.trim()) return
    setLoading(true)
    try {
      await api.post('/community/create', {
        text,
        lat:         location?.lat || 0,
        lng:         location?.lng || 0,
        area:        'Nearby',
        type:        'distress',
        isAnonymous: true,
      })
    } catch {}
    setSent(true)
    setText('')
    setLoading(false)
    setTimeout(() => { setSent(false); setOpen(false) }, 3000)
  }

  return (
    <div style={{
      borderRadius: '16px', padding: '16px',
      background: 'white', border: '1px solid rgba(196,149,106,0.2)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: open ? '12px' : 0,
      }}>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 500, color: '#2C1A0E', margin: '0 0 2px' }}>
            💬 Send a Help Message
          </p>
          <p style={{ fontSize: '12px', color: '#C4956A', margin: 0 }}>
            Tell nearby women what you need
          </p>
        </div>
        <button onClick={() => setOpen(!open)} style={{
          padding: '8px 16px', borderRadius: '10px', fontSize: '12px',
          fontWeight: 500, cursor: 'pointer', border: 'none',
          background: open ? 'rgba(196,149,106,0.12)' : '#5C1F1F',
          color: open ? '#C4956A' : 'white',
        }}>
          {open ? 'Cancel' : 'Ask for Help'}
        </button>
      </div>

      {open && (
        sent ? (
          <div style={{
            padding: '12px', borderRadius: '10px', textAlign: 'center',
            background: 'rgba(45,106,79,0.08)',
          }}>
            <p style={{ color: '#2D6A4F', fontSize: '13px', margin: 0 }}>
              ✓ Message sent to nearby women!
            </p>
          </div>
        ) : (
          <>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Example: Near XYZ metro, feeling unsafe. Need help..."
              style={{
                width: '100%', padding: '10px 12px', borderRadius: '10px',
                fontSize: '13px', color: '#2C1A0E', outline: 'none',
                resize: 'none', minHeight: '80px', background: '#FFF8F0',
                border: '1px solid rgba(196,149,106,0.3)', boxSizing: 'border-box',
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !text.trim()}
              style={{
                width: '100%', padding: '12px', borderRadius: '10px',
                fontSize: '13px', fontWeight: 600, marginTop: '8px',
                background: loading ? '#EDE4D4' : '#2D6A4F',
                color: 'white', border: 'none',
                cursor: loading || !text.trim() ? 'default' : 'pointer',
                opacity: !text.trim() ? 0.6 : 1,
              }}
            >
              {loading ? 'Sending...' : 'Send to Nearby Women'}
            </button>
          </>
        )
      )}
    </div>
  )
}