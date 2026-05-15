'use client'

import { useState, useEffect, useRef } from 'react'
import api from '@/lib/axios'
import { getSocket } from '@/lib/socket'

const SITUATIONS = [
  { value: 'followed',    label: 'Being followed',     icon: '👣' },
  { value: 'cab',         label: 'Unsafe cab/auto',    icon: '🚗' },
  { value: 'alone',       label: 'Alone at night',     icon: '🌙' },
  { value: 'unsafe_area', label: 'Unsafe public area', icon: '⚠️' },
  { value: 'other',       label: 'Other concern',      icon: '🙏' },
]

function TempChatRoom({ chatRoom, onLeave }) {
  const [messages, setMessages] = useState([])
  const [text,     setText]     = useState('')
  const [expired,  setExpired]  = useState(false)
  const [timer,    setTimer]    = useState(20 * 60) // 20 min
  const endRef  = useRef(null)
  const socket  = getSocket()

  useEffect(() => {
    socket.emit('join-support-chat', { room: chatRoom })

    socket.on('chat-message', (msg) => {
      setMessages(prev => [...prev, msg])
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    })

    socket.on('chat-expired', () => setExpired(true))
    socket.on('emergency_disconnect', () => { setExpired(true); onLeave() })

    // Countdown timer
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) { clearInterval(interval); setExpired(true); return 0 }
        return prev - 1
      })
    }, 1000)

    return () => {
      socket.off('chat-message')
      socket.off('chat-expired')
      socket.off('emergency_disconnect')
      clearInterval(interval)
    }
  }, [chatRoom])

  const sendMsg = () => {
    if (!text.trim()) return
    const msg = {
      room:     chatRoom,
      text:     text.trim(),
      userName: 'You',
      time:     new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    }
    socket.emit('send-message', msg)
    setMessages(prev => [...prev, { ...msg, self: true }])
    setText('')
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  const formatTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`

  if (expired) {
    return (
      <div className="rounded-2xl p-6 text-center"
        style={{ background: 'white', border: '1px solid rgba(196,149,106,0.2)' }}
      >
        <div className="text-3xl mb-3">⏰</div>
        <p className="text-sm font-medium text-[#2C1A0E] mb-1">Chat session ended</p>
        <p className="text-xs mb-4" style={{ color: '#C4956A' }}>Messages auto-deleted for your privacy</p>
        <button onClick={onLeave}
          className="px-5 py-2 rounded-xl text-sm text-white"
          style={{ background: '#5C1F1F' }}
        >
          Close
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: 'white', border: '1px solid rgba(196,149,106,0.2)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3"
        style={{ background: 'rgba(45,106,79,0.06)', borderBottom: '1px solid rgba(196,149,106,0.15)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-xs font-medium text-[#2C1A0E]">Anonymous Support Chat</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: timer < 300 ? '#E24B4A' : '#C4956A' }}>
            ⏱ {formatTime(timer)}
          </span>
          <button onClick={onLeave}
            className="text-xs px-2 py-1 rounded-lg"
            style={{ background: 'rgba(124,29,29,0.1)', color: '#7C1D1D' }}
          >
            Leave
          </button>
        </div>
      </div>

      <div className="px-3 py-2 text-center">
        <p className="text-[10px]" style={{ color: '#C4956A' }}>
          🔒 Anonymous · No personal info shared · Auto-deletes on exit
        </p>
      </div>

      {/* Messages */}
      <div className="px-4 py-2 space-y-2 overflow-y-auto" style={{ maxHeight: '260px', minHeight: '120px' }}>
        {messages.length === 0 && (
          <p className="text-xs text-center py-6" style={{ color: '#C4956A' }}>
            Connected 🤝 Say hi anonymously
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[75%] rounded-2xl px-3 py-2"
              style={{
                background: msg.self ? '#5C1F1F' : 'rgba(196,149,106,0.1)',
                color:      msg.self ? 'white'   : '#2C1A0E',
                borderBottomRightRadius: msg.self ? '4px' : '16px',
                borderBottomLeftRadius:  msg.self ? '16px' : '4px',
              }}
            >
              <p className="text-xs leading-relaxed">{msg.text}</p>
              <p className="text-[10px] mt-1 opacity-50 text-right">{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 px-4 pb-4 pt-2"
        style={{ borderTop: '0.5px solid rgba(196,149,106,0.1)' }}
      >
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMsg()}
          placeholder="Type message..."
          className="flex-1 px-3 py-2 rounded-xl text-xs text-[#2C1A0E] outline-none"
          style={{ background: 'rgba(196,149,106,0.06)', border: '1px solid rgba(196,149,106,0.2)' }}
        />
        <button onClick={sendMsg} disabled={!text.trim()}
          className="px-4 py-2 rounded-xl text-xs font-medium text-white disabled:opacity-40"
          style={{ background: '#5C1F1F' }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default function SupportRequest({ location }) {
  const [step,       setStep]       = useState('idle') // idle | select | waiting | chat
  const [situation,  setSituation]  = useState('')
  const [chatRoom,   setChatRoom]   = useState(null)
  const [requestId,  setRequestId]  = useState(null)
  const [error,      setError]      = useState('')
  const socket = getSocket()

  useEffect(() => {
    // Support accepted — chat room mil gayi
    socket.on('support_accepted', ({ chatRoom: room }) => {
      setChatRoom(room)
      setStep('chat')
    })
    return () => socket.off('support_accepted')
  }, [])

  const handleRequest = async () => {
    if (!situation || !location) return
    setError('')
    try {
      const { data } = await api.post('/support/request', {
        lat:       location.lat,
        lng:       location.lng,
        area:      'Nearby',
        situation,
      })
      setRequestId(data.requestId)
      setStep('waiting')
    } catch {
      setError('Could not send request. Try again.')
    }
  }

  const handleCancel = () => {
    setStep('idle')
    setSituation('')
    setChatRoom(null)
    setRequestId(null)
  }

  if (step === 'chat' && chatRoom) {
    return <TempChatRoom chatRoom={chatRoom} onLeave={handleCancel} />
  }

  return (
    <div className="rounded-2xl p-4"
      style={{ background: 'white', border: '1px solid rgba(196,149,106,0.2)' }}
    >
      {step === 'idle' && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
              style={{ background: 'rgba(196,149,106,0.1)' }}
            >
              🤝
            </div>
            <div>
              <p className="text-sm font-medium text-[#2C1A0E]">Need Nearby Support?</p>
              <p className="text-xs" style={{ color: '#C4956A' }}>
                Anonymous — location not shared exactly
              </p>
            </div>
          </div>
          <button
            onClick={() => setStep('select')}
            className="w-full py-3 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(to right, #C4956A, #A07040)' }}
          >
            Request Community Support
          </button>
        </>
      )}

      {step === 'select' && (
        <>
          <p className="text-sm font-medium text-[#2C1A0E] mb-3">What's happening?</p>
          <div className="space-y-2 mb-4">
            {SITUATIONS.map((s) => (
              <button key={s.value}
                onClick={() => setSituation(s.value)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all"
                style={{
                  background: situation === s.value ? 'rgba(196,149,106,0.15)' : 'rgba(196,149,106,0.05)',
                  border:     `1px solid ${situation === s.value ? '#C4956A' : 'rgba(196,149,106,0.2)'}`,
                  color:      '#2C1A0E',
                }}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
          {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
          <div className="flex gap-2">
            <button onClick={handleRequest} disabled={!situation}
              className="flex-1 py-3 rounded-xl text-sm font-medium text-white disabled:opacity-50"
              style={{ background: '#5C1F1F' }}
            >
              Send Request
            </button>
            <button onClick={handleCancel}
              className="px-4 py-3 rounded-xl text-sm"
              style={{ border: '1px solid rgba(196,149,106,0.3)', color: '#C4956A' }}
            >
              Cancel
            </button>
          </div>
        </>
      )}

      {step === 'waiting' && (
        <div className="text-center py-4">
          <div className="text-3xl mb-3 animate-pulse">🔍</div>
          <p className="text-sm font-medium text-[#2C1A0E] mb-1">Looking for nearby support...</p>
          <p className="text-xs mb-4" style={{ color: '#C4956A' }}>
            Anonymous request sent · Will expire in 20 min
          </p>
          <p className="text-xs mb-4" style={{ color: 'rgba(196,149,106,0.7)' }}>
            Your exact location is never shared
          </p>
          <button onClick={handleCancel}
            className="px-5 py-2 rounded-xl text-xs"
            style={{ border: '1px solid rgba(196,149,106,0.3)', color: '#C4956A' }}
          >
            Cancel Request
          </button>
        </div>
      )}
    </div>
  )
}