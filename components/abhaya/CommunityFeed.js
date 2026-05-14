'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/axios'
import useAuthStore from '@/store/authStore'

export default function CommunityFeed({ location }) {
  const { user } = useAuthStore()
  const router   = useRouter()

  const [posts,        setPosts]        = useState([])
  const [loading,      setLoading]      = useState(true)
  const [text,         setText]         = useState('')
  const [posting,      setPosting]      = useState(false)
  const [isAnon,       setIsAnon]       = useState(true)
  const [activeChatId, setActiveChatId] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [chatText,     setChatText]     = useState('')
  const [chatLoading,  setChatLoading]  = useState(false)
  const socketRef  = useRef(null)
  const chatEndRef = useRef(null)

  // Socket.io — real-time
  useEffect(() => {
    const initSocket = async () => {
      const { io } = await import('socket.io-client')
      socketRef.current = io(
        process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000',
        { transports: ['websocket'] }
      )

      // Naya post aaya — location match karo
      socketRef.current.on('new-community-post', (post) => {
        if (!location) return

        // Distance check — 500m ke andar hai?
        const dist = getDistance(
          location.lat, location.lng,
          post.lat, post.lng
        )

        if (dist <= 500) {
          setPosts((prev) => {
            // Duplicate nahi add karo
            if (prev.find(p => p._id === post._id)) return prev
            return [post, ...prev]
          })
        }
      })

      // Help update
      socketRef.current.on('post-helped', ({ postId, helpCount }) => {
        setPosts((prev) =>
          prev.map((p) => p._id === postId ? { ...p, helpCount } : p)
        )
      })

      // Chat message aaya
      socketRef.current.on('chat-message', (msg) => {
        setChatMessages((prev) => [...prev, { ...msg, self: false }])
        setTimeout(() => {
          chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 50)
      })
    }

    initSocket()
    return () => socketRef.current?.disconnect()
  }, [location])

  // Fetch nearby posts
  const fetchPosts = async () => {
    if (!location) return
    try {
      const { data } = await api.get('/community/nearby', {
        params: { lat: location.lat, lng: location.lng },
      })
      setPosts(data.posts || [])
    } catch (err) {
      console.error('Feed fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (location) fetchPosts()
    else setLoading(false)
  }, [location])

  // Create post
  const handlePost = async () => {
    if (!text.trim() || !location) return
    setPosting(true)
    try {
      await api.post('/community/create', {
        text,
        lat:         location.lat,
        lng:         location.lng,
        area:        'Nearby',
        type:        'distress',
        isAnonymous: isAnon,
      })
      setText('')
    } catch (err) {
      console.error('Post failed:', err)
    } finally {
      setPosting(false)
    }
  }

  // Help
  const handleHelp = async (postId) => {
    try {
      await api.put(`/community/help/${postId}`)
      setPosts((prev) =>
        prev.map((p) => p._id === postId ? { ...p, helped: true } : p)
      )
    } catch (err) {
      console.error('Help failed:', err)
    }
  }

  // Open inline chat
  const openChat = async (post) => {
    setChatLoading(true)
    try {
      const { data } = await api.post(`/community/chat/${post._id}`)
      const room = data.chatRoom

      if (activeChatId === room) {
        setActiveChatId(null)
        return
      }

      // Leave old room
      if (activeChatId) {
        socketRef.current?.emit('leave-room', activeChatId)
      }

      setActiveChatId(room)
      setChatMessages([])
      socketRef.current?.emit('join-room', room)
    } catch (err) {
      console.error('Chat failed:', err)
    } finally {
      setChatLoading(false)
    }
  }

  // Send chat
  const sendChat = () => {
    if (!chatText.trim() || !activeChatId) return

    const msg = {
      room:     activeChatId,
      text:     chatText.trim(),
      userName: isAnon ? 'Anonymous' : (user?.fullName || 'You'),
      time:     new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit'
      }),
    }

    socketRef.current?.emit('send-message', msg)

    // Apna msg turant dikhao
    setChatMessages((prev) => [...prev, { ...msg, self: true }])
    setChatText('')

    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  // Time ago
  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 1000)
    if (diff < 60)   return 'just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    return `${Math.floor(diff / 3600)}h ago`
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
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs" style={{ color: '#C4956A' }}>Live</span>
        </div>
      </div>

      {/* No location warning */}
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
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handlePost()
              }
            }}
            placeholder="Share what you are experiencing nearby... (Enter to post)"
            className="w-full text-sm text-[#2C1A0E] outline-none resize-none"
            style={{ background: 'transparent', border: 'none', minHeight: '70px' }}
          />

          <div className="flex items-center justify-between mt-2 pt-2"
            style={{ borderTop: '0.5px solid rgba(196,149,106,0.15)' }}
          >
            {/* Anonymous toggle */}
            <button
              onClick={() => setIsAnon(!isAnon)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{
                background: isAnon ? 'rgba(244,167,185,0.1)' : 'rgba(45,106,79,0.1)',
                color:      isAnon ? '#C4956A' : '#2D6A4F',
                border:     `1px solid ${isAnon ? 'rgba(244,167,185,0.3)' : 'rgba(45,106,79,0.3)'}`,
              }}
            >
              {isAnon ? '👤 Anonymous' : `👩 ${user?.fullName?.split(' ')[0] || 'You'}`}
            </button>

            <button
              onClick={handlePost}
              disabled={posting || !text.trim()}
              className="px-4 py-2 rounded-xl text-xs font-medium text-white disabled:opacity-50 transition-all hover:scale-105"
              style={{ background: '#5C1F1F' }}
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
          <p className="text-sm font-medium text-[#2C1A0E]">
            No reports in your area
          </p>
          <p className="text-xs mt-1" style={{ color: '#C4956A' }}>
            This area seems safe · Posts appear when women within 500m share
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post._id} className="rounded-2xl overflow-hidden"
              style={{
                background: 'white',
                border: post.type === 'distress'
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

                {/* Message */}
                <p className="text-sm text-[#2C1A0E] leading-relaxed mb-4">
                  {post.text}
                </p>

                {/* Action buttons */}
                <div className="flex gap-2 flex-wrap">
                  {!post.helped ? (
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
                  ) : (
                    <span className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs"
                      style={{ background: 'rgba(45,106,79,0.1)', color: '#2D6A4F' }}
                    >
                      ✓ You responded
                    </span>
                  )}

                  <button
                    onClick={() => openChat(post)}
                    disabled={chatLoading}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:scale-105"
                    style={{
                      border:  `1px solid ${activeChatId === `chat_${post._id}` ? '#7C1D1D' : 'rgba(196,149,106,0.3)'}`,
                      color:   activeChatId === `chat_${post._id}` ? '#7C1D1D' : '#C4956A',
                      background: activeChatId === `chat_${post._id}` ? 'rgba(124,29,29,0.05)' : 'transparent',
                    }}
                  >
                    💬 {activeChatId === `chat_${post._id}` ? 'Close Chat' : 'Private Chat'}
                  </button>
                </div>
              </div>

              {/* Inline Chat Panel */}
              {activeChatId === `chat_${post._id}` && (
                <div style={{ borderTop: '1px solid rgba(196,149,106,0.15)' }}>

                  {/* Chat header */}
                  <div className="flex items-center justify-between px-4 py-2.5"
                    style={{ background: 'rgba(124,29,29,0.04)' }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-xs font-medium text-[#2C1A0E]">
                        Private Chat with {post.userName}
                      </p>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded-full"
                      style={{ background: 'rgba(45,106,79,0.1)', color: '#2D6A4F' }}
                    >
                      Only you two can see this
                    </span>
                  </div>

                  {/* Messages */}
                  <div className="px-4 py-3 space-y-2 overflow-y-auto"
                    style={{ maxHeight: '220px', minHeight: '100px' }}
                  >
                    {chatMessages.length === 0 && (
                      <div className="text-center py-4">
                        <p className="text-xs" style={{ color: '#C4956A' }}>
                          Say hi 👋 — only you and {post.userName} are here
                        </p>
                      </div>
                    )}

                    {chatMessages.map((msg, i) => (
                      <div key={i}
                        className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="max-w-[75%]">
                          {!msg.self && (
                            <p className="text-[10px] mb-1 ml-1" style={{ color: '#C4956A' }}>
                              {msg.userName}
                            </p>
                          )}
                          <div className="rounded-2xl px-3 py-2"
                            style={{
                              background: msg.self
                                ? '#5C1F1F'
                                : 'rgba(196,149,106,0.1)',
                              color: msg.self ? 'white' : '#2C1A0E',
                              borderBottomRightRadius: msg.self ? '4px' : '16px',
                              borderBottomLeftRadius:  msg.self ? '16px' : '4px',
                            }}
                          >
                            <p className="text-xs leading-relaxed">{msg.text}</p>
                            <p className="text-[10px] mt-1 opacity-60 text-right">
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat input */}
                  <div className="flex gap-2 px-4 pb-4 pt-2"
                    style={{ borderTop: '0.5px solid rgba(196,149,106,0.1)' }}
                  >
                    <input
                      value={chatText}
                      onChange={(e) => setChatText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                      placeholder="Type a message... (Enter to send)"
                      className="flex-1 px-3 py-2 rounded-xl text-xs text-[#2C1A0E] outline-none"
                      style={{
                        background: 'rgba(196,149,106,0.06)',
                        border:     '1px solid rgba(196,149,106,0.2)',
                      }}
                    />
                    <button
                      onClick={sendChat}
                      disabled={!chatText.trim()}
                      className="px-4 py-2 rounded-xl text-xs font-medium text-white disabled:opacity-40 transition-all hover:scale-105"
                      style={{ background: '#5C1F1F' }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Distance calculate karo
function getDistance(lat1, lng1, lat2, lng2) {
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