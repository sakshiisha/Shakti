'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import api from '@/lib/axios'
import useAuthStore from '@/store/authStore'
import { getSocket } from '@/lib/socket'

const RADIUS = 500

function getDistanceMeters(lat1, lng1, lat2, lng2) {
  if (!lat2 || !lng2) return 9999
  const R    = 6371000
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a    =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2
  return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000)
  if (diff < 60)   return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return `${Math.floor(diff / 3600)}h ago`
}

// ── Chat Panel ───────────────────────────────────────────────────────────────
function ChatPanel({ post, currentUser, isAnon, onClose }) {
  const socket = getSocket()
  const roomId = `chat_${post._id}`
  const [messages, setMessages] = useState([])
  const [text,     setText]     = useState('')
  const [reported, setReported] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    socket.emit('join-room', roomId)

    const onMessage = (msg) => {
      setMessages((prev) => [...prev, { ...msg, self: false }])
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    }

    const onDisconnect = () => onClose()

    socket.on('chat-message',        onMessage)
    socket.on('emergency_disconnect', onDisconnect)

    return () => {
      socket.off('chat-message',        onMessage)
      socket.off('emergency_disconnect', onDisconnect)
      socket.emit('leave-room', roomId)
    }
  }, [roomId])

  const sendMsg = () => {
    if (!text.trim()) return
    const msg = {
      room:     roomId,
      text:     text.trim(),
      userName: isAnon ? 'Anonymous' : (currentUser?.fullName || 'You'),
      time:     new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit',
      }),
    }
    socket.emit('send-message', msg)
    setMessages((prev) => [...prev, { ...msg, self: true }])
    setText('')
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  const handleEmergencyDisconnect = () => {
    socket.emit('emergency_disconnect', { room: roomId })
    onClose()
  }

  const handleReport = async () => {
    try {
      await api.post('/support/report', {
        reportedUserId: post.user,
        reason:         'harassment',
        chatRoom:       roomId,
      })
      setReported(true)
      setTimeout(onClose, 1500)
    } catch {}
  }

  return (
    <div style={{ borderTop: '1px solid rgba(196,149,106,0.15)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5"
        style={{ background: 'rgba(124,29,29,0.04)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <p className="text-xs font-medium text-[#2C1A0E]">
            Private Chat — {post.userName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {reported ? (
            <span className="text-[10px] px-2 py-1 rounded-full"
              style={{ background: 'rgba(45,106,79,0.1)', color: '#2D6A4F' }}
            >
              ✓ Reported
            </span>
          ) : (
            <button onClick={handleReport}
              className="text-[10px] px-2 py-1 rounded-lg"
              style={{ background: 'rgba(124,29,29,0.08)', color: '#7C1D1D' }}
            >
              🚩 Report
            </button>
          )}
          <button onClick={handleEmergencyDisconnect}
            className="text-[10px] px-2 py-1 rounded-lg font-medium"
            style={{ background: '#E24B4A', color: 'white' }}
          >
            ⚡ End
          </button>
          <button onClick={onClose}
            className="text-xs px-2 py-1 rounded-lg"
            style={{ color: '#C4956A' }}
          >
            ✕
          </button>
        </div>
      </div>

      <div className="px-3 py-1.5 text-center"
        style={{ background: 'rgba(196,149,106,0.04)' }}
      >
        <p className="text-[10px]" style={{ color: '#C4956A' }}>
          🔒 Anonymous · No personal info shared · Messages not stored
        </p>
      </div>

      {/* Messages */}
      <div className="px-4 py-3 space-y-2 overflow-y-auto"
        style={{ maxHeight: '220px', minHeight: '80px' }}
      >
        {messages.length === 0 && (
          <p className="text-xs text-center py-4" style={{ color: '#C4956A' }}>
            Say hi 👋 — only you and {post.userName} are here
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[75%]">
              {!msg.self && (
                <p className="text-[10px] mb-1 ml-1" style={{ color: '#C4956A' }}>
                  {msg.userName}
                </p>
              )}
              <div className="rounded-2xl px-3 py-2"
                style={{
                  background: msg.self ? '#5C1F1F' : 'rgba(196,149,106,0.1)',
                  color:      msg.self ? 'white'   : '#2C1A0E',
                  borderBottomRightRadius: msg.self ? '4px'  : '16px',
                  borderBottomLeftRadius:  msg.self ? '16px' : '4px',
                }}
              >
                <p className="text-xs leading-relaxed">{msg.text}</p>
                <p className="text-[10px] mt-1 opacity-60 text-right">{msg.time}</p>
              </div>
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
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMsg()}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded-xl text-xs text-[#2C1A0E] outline-none"
          style={{
            background: 'rgba(196,149,106,0.06)',
            border:     '1px solid rgba(196,149,106,0.2)',
          }}
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

// ── Support Request Banner — koi nearby request hai ─────────────────────────
function SupportBanner({ request, onAccept, onDismiss }) {
  return (
    <div className="rounded-2xl p-4 mb-4 flex items-center justify-between gap-3"
      style={{ background: '#FAEEDA', border: '1px solid rgba(239,159,39,0.4)' }}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">🙏</span>
        <div>
          <p className="text-sm font-medium text-[#2C1A0E]">
            Someone nearby needs support
          </p>
          <p className="text-xs" style={{ color: '#633806' }}>
            {request.situation?.replace('_', ' ')} · Anonymous request
          </p>
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button onClick={() => onAccept(request._id)}
          className="px-3 py-2 rounded-xl text-xs font-medium text-white"
          style={{ background: '#2D6A4F' }}
        >
          Help
        </button>
        <button onClick={onDismiss}
          className="px-3 py-2 rounded-xl text-xs"
          style={{ color: '#C4956A', border: '1px solid rgba(196,149,106,0.3)' }}
        >
          Skip
        </button>
      </div>
    </div>
  )
}

// ── Main Feed ────────────────────────────────────────────────────────────────
export default function CommunityFeed({ location }) {
  const { user } = useAuthStore()
  const socket   = getSocket()

  const [posts,          setPosts]          = useState([])
  const [loading,        setLoading]        = useState(true)
  const [text,           setText]           = useState('')
  const [posting,        setPosting]        = useState(false)
  const [isAnon,         setIsAnon]         = useState(true)
  const [activeChatId,   setActiveChatId]   = useState(null)
  const [connected,      setConnected]      = useState(false)
  const [supportRequest, setSupportRequest] = useState(null)
  const [postType,       setPostType]       = useState('distress')

  const prevLocationRef = useRef(null)

  // ── Socket ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const onConnect    = () => setConnected(true)
    const onDisconnect = () => setConnected(false)

    const onNewPost = (post) => {
      if (!location) return
      const pLat = post.location?.coordinates?.[1]
      const pLng = post.location?.coordinates?.[0]
      const dist = getDistanceMeters(
        location.lat, location.lng,
        pLat || location.lat,
        pLng || location.lng
      )
      if (dist <= RADIUS) {
        setPosts((prev) => {
          if (prev.find((p) => p._id === post._id)) return prev
          return [post, ...prev]
        })
      }
    }

    const onPostHelped = ({ postId, helpCount }) => {
      setPosts((prev) =>
        prev.map((p) => (p._id === postId ? { ...p, helpCount } : p))
      )
    }

    // Support request nearby
    const onSupportRequest = (req) => {
      setSupportRequest(req)
    }

    socket.on('connect',            onConnect)
    socket.on('disconnect',         onDisconnect)
    socket.on('new-community-post', onNewPost)
    socket.on('post-helped',        onPostHelped)
    socket.on('support_request',    onSupportRequest)

    if (socket.connected) setConnected(true)

    return () => {
      socket.off('connect',            onConnect)
      socket.off('disconnect',         onDisconnect)
      socket.off('new-community-post', onNewPost)
      socket.off('post-helped',        onPostHelped)
      socket.off('support_request',    onSupportRequest)
    }
  }, [location])

  // ── Fetch posts ──────────────────────────────────────────────────────────
  const fetchPosts = useCallback(async () => {
    if (!location) return
    setLoading(true)

    if (prevLocationRef.current) {
      const oldRoom = `near_${prevLocationRef.current.lat.toFixed(2)}_${prevLocationRef.current.lng.toFixed(2)}`
      socket.emit('leave-room', oldRoom)
    }

    socket.emit('join-nearby', { lat: location.lat, lng: location.lng })
    socket.emit('user_online',  { lat: location.lat, lng: location.lng })
    prevLocationRef.current = location

    try {
      const { data } = await api.get('/community/nearby', {
        params: { lat: location.lat, lng: location.lng, radius: RADIUS },
      })

      const nearbyPosts = (data.posts || []).filter((post) => {
        const pLat = post.location?.coordinates?.[1]
        const pLng = post.location?.coordinates?.[0]
        if (!pLat || !pLng) return false
        return getDistanceMeters(location.lat, location.lng, pLat, pLng) <= RADIUS
      })

      setPosts(nearbyPosts)
    } catch (err) {
      console.error('Feed fetch failed:', err)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }, [location])

  // ── Location change — posts clear + refetch ──────────────────────────────
  useEffect(() => {
    if (!location) { setLoading(false); return }

    const prev = prevLocationRef.current
    if (prev) {
      const dist = getDistanceMeters(prev.lat, prev.lng, location.lat, location.lng)
      if (dist > 100) {
        setPosts([])
        setActiveChatId(null)
        fetchPosts()
      }
    } else {
      fetchPosts()
    }
  }, [location])

  // ── Create post ──────────────────────────────────────────────────────────
  const handlePost = async () => {
    if (!text.trim() || !location) return
    setPosting(true)
    try {
      await api.post('/community/create', {
        text,
        lat:         location.lat,
        lng:         location.lng,
        area:        'Nearby',
        type:        postType,
        isAnonymous: isAnon,
      })
      setText('')
    } catch (err) {
      console.error('Post failed:', err)
    } finally {
      setPosting(false)
    }
  }

  // ── Mark helped ──────────────────────────────────────────────────────────
  const handleHelp = async (postId) => {
    try {
      await api.put(`/community/help/${postId}`)
      setPosts((prev) =>
        prev.map((p) => (p._id === postId ? { ...p, helped: true } : p))
      )
    } catch {}
  }

  // ── Accept support request ───────────────────────────────────────────────
  const handleAcceptSupport = async (requestId) => {
    try {
      await api.post(`/support/accept/${requestId}`)
      setSupportRequest(null)
    } catch {}
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl text-[#2C1A0E]"
            style={{ fontFamily: 'Yatra One, cursive' }}
          >
            Nearby Voices
          </h2>
          <p className="text-xs mt-0.5" style={{ color: '#C4956A' }}>
            Women within 500m · Real-time
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full"
            style={{
              background: connected ? '#2D6A4F' : '#C4956A',
              animation:  connected ? 'pulse 2s infinite' : 'none',
            }}
          />
          <span className="text-xs"
            style={{ color: connected ? '#2D6A4F' : '#C4956A' }}
          >
            {connected ? 'Live' : 'Connecting...'}
          </span>
        </div>
      </div>

      {/* Support request banner */}
      {supportRequest && (
        <SupportBanner
          request={supportRequest}
          onAccept={handleAcceptSupport}
          onDismiss={() => setSupportRequest(null)}
        />
      )}

      {/* No location */}
      {!location && (
        <div className="rounded-xl p-4 mb-4 text-sm text-center"
          style={{ background: '#FAEEDA', color: '#633806', border: '1px solid rgba(239,159,39,0.3)' }}
        >
          ⚠️ Please allow location access to see nearby posts
        </div>
      )}

      {/* Post box */}
      {location && (
        <div className="rounded-2xl p-4 mb-5"
          style={{ background: 'white', border: '1px solid rgba(196,149,106,0.2)' }}
        >
          {/* Post type toggle */}
          <div className="flex gap-2 mb-3">
            {[
              { value: 'distress', label: '⚠ Needs Help', color: '#FCEBEB', active: '#791F1F' },
              { value: 'general',  label: '📢 Info Share', color: '#EAF3DE', active: '#27500A' },
            ].map((t) => (
              <button key={t.value}
                onClick={() => setPostType(t.value)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: postType === t.value ? t.color : 'transparent',
                  color:      postType === t.value ? t.active : '#C4956A',
                  border:     `1px solid ${postType === t.value ? t.active + '40' : 'rgba(196,149,106,0.2)'}`,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handlePost()
              }
            }}
            placeholder={
              postType === 'distress'
                ? 'Describe what is happening nearby...'
                : 'Share safety info for this area...'
            }
            className="w-full text-sm text-[#2C1A0E] outline-none resize-none"
            style={{ background: 'transparent', border: 'none', minHeight: '70px' }}
          />

          <div className="flex items-center justify-between mt-2 pt-2"
            style={{ borderTop: '0.5px solid rgba(196,149,106,0.15)' }}
          >
            <button
              onClick={() => setIsAnon(!isAnon)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{
                background: isAnon ? 'rgba(244,167,185,0.1)' : 'rgba(45,106,79,0.1)',
                color:      isAnon ? '#C4956A'               : '#2D6A4F',
                border:     `1px solid ${isAnon ? 'rgba(244,167,185,0.3)' : 'rgba(45,106,79,0.3)'}`,
              }}
            >
              {isAnon ? '👤 Anonymous' : `👩 ${user?.fullName?.split(' ')[0] || 'You'}`}
            </button>

            <button
              onClick={handlePost}
              disabled={posting || !text.trim()}
              className="px-4 py-2 rounded-xl text-xs font-medium text-white disabled:opacity-50 transition-all hover:scale-105"
              style={{ background: postType === 'distress' ? '#7C1D1D' : '#2D6A4F' }}
            >
              {posting ? 'Posting...' : 'Share nearby'}
            </button>
          </div>
        </div>
      )}

      {/* Posts */}
      {loading ? (
        <div className="text-center py-10" style={{ color: '#C4956A' }}>
          <div className="text-2xl mb-2 animate-pulse">📍</div>
          <p className="text-sm">Finding women near you...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-10 rounded-2xl"
          style={{ background: 'white', border: '1px solid rgba(196,149,106,0.15)' }}
        >
          <div className="text-3xl mb-2">🌿</div>
          <p className="text-sm font-medium text-[#2C1A0E]">No reports in your area</p>
          <p className="text-xs mt-1" style={{ color: '#C4956A' }}>
            Area seems safe · Posts from women within 500m appear here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post._id} className="rounded-2xl overflow-hidden"
              style={{
                background: 'white',
                border:     post.type === 'distress'
                  ? '1px solid rgba(232,180,184,0.4)'
                  : '1px solid rgba(196,149,106,0.2)',
                borderLeft: post.type === 'distress'
                  ? '4px solid #E8B4B8'
                  : '4px solid #C4956A',
              }}
            >
              <div className="p-4">
                {/* User row */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium text-white flex-shrink-0"
                    style={{ background: post.type === 'distress' ? '#7C1D1D' : '#2D6A4F' }}
                  >
                    {post.userName === 'Anonymous'
                      ? '👤'
                      : post.userName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium text-[#2C1A0E]">
                        {post.userName || 'Anonymous'}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          background: post.type === 'distress' ? '#FCEBEB' : '#EAF3DE',
                          color:      post.type === 'distress' ? '#791F1F' : '#27500A',
                        }}
                      >
                        {post.type === 'distress' ? '⚠ Needs Help' : '📢 Info'}
                      </span>
                    </div>
                    <p className="text-[11px] mt-0.5" style={{ color: '#C4956A' }}>
                      📍 {post.location?.area || 'Nearby'} · {timeAgo(post.createdAt)}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[#2C1A0E] leading-relaxed mb-4">
                  {post.text}
                </p>

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  {post.helped ? (
                    <span className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs"
                      style={{ background: 'rgba(45,106,79,0.1)', color: '#2D6A4F' }}
                    >
                      ✓ You responded
                    </span>
                  ) : (
                    <button onClick={() => handleHelp(post._id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white transition-all hover:scale-105"
                      style={{ background: '#2D6A4F' }}
                    >
                      🤝 I'll Help
                      {post.helpCount > 0 && (
                        <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px]"
                          style={{ background: 'rgba(255,255,255,0.2)' }}
                        >
                          {post.helpCount}
                        </span>
                      )}
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setActiveChatId((prev) => prev === post._id ? null : post._id)
                    }
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:scale-105"
                    style={{
                      border:     `1px solid ${activeChatId === post._id ? '#7C1D1D' : 'rgba(196,149,106,0.3)'}`,
                      color:      activeChatId === post._id ? '#7C1D1D' : '#C4956A',
                      background: activeChatId === post._id ? 'rgba(124,29,29,0.05)' : 'transparent',
                    }}
                  >
                    💬 {activeChatId === post._id ? 'Close Chat' : 'Private Chat'}
                  </button>
                </div>
              </div>

              {activeChatId === post._id && (
                <ChatPanel
                  post={post}
                  currentUser={user}
                  isAnon={isAnon}
                  onClose={() => setActiveChatId(null)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}