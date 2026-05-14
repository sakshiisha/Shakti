'use client'

import { useEffect, useState, useRef } from 'react'
import api from '@/lib/axios'
import useAuthStore from '@/store/authStore'
import { io } from 'socket.io-client'

export default function CommunityFeed({ location }) {
  const { user } = useAuthStore()
  const [posts,       setPosts]       = useState([])
  const [loading,     setLoading]     = useState(true)
  const [text,        setText]        = useState('')
  const [posting,     setPosting]     = useState(false)
  const [isAnon,      setIsAnon]      = useState(true)
  const [activeChatId, setActiveChatId] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [chatText,    setChatText]    = useState('')
  const socketRef = useRef(null)
  const chatEndRef = useRef(null)

  // Socket.io connect
  useEffect(() => {
    socketRef.current = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000'
    )

    // Real-time new post
    socketRef.current.on('new-community-post', (post) => {
      setPosts((prev) => [post, ...prev])
    })

    // Real-time help update
    socketRef.current.on('post-helped', ({ postId, helpCount }) => {
      setPosts((prev) =>
        prev.map((p) => p._id === postId ? { ...p, helpCount } : p)
      )
    })

    // Chat messages
    socketRef.current.on('chat-message', (msg) => {
      setChatMessages((prev) => [...prev, msg])
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    })

    return () => socketRef.current?.disconnect()
  }, [])

  // Fetch posts
  const fetchPosts = async () => {
    if (!location) return
    try {
      const { data } = await api.get('/community/nearby', {
        params: { lat: location.lat, lng: location.lng, radius: 2000 },
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
    if (!text.trim()) return
    setPosting(true)
    try {
      await api.post('/community/create', {
        text,
        lat:         location?.lat || 0,
        lng:         location?.lng || 0,
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

  // Mark helped
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

  // Open chat
  const openChat = async (post) => {
    try {
      const { data } = await api.post(`/community/chat/${post._id}`)
      setActiveChatId(data.chatRoom)
      setChatMessages([])
      socketRef.current?.emit('join-room', data.chatRoom)
    } catch (err) {
      console.error('Chat start failed:', err)
    }
  }

  // Send chat message
  const sendChat = () => {
    if (!chatText.trim() || !activeChatId) return
    const msg = {
      room:     activeChatId,
      text:     chatText,
      userName: user?.fullName || 'You',
      time:     new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    }
    socketRef.current?.emit('send-message', msg)
    setChatMessages((prev) => [...prev, { ...msg, self: true }])
    setChatText('')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl text-[#2C1A0E] mb-0.5"
            style={{ fontFamily: 'Yatra One, cursive' }}
          >
            Nearby Voices
          </h2>
          <p className="text-xs" style={{ color: '#C4956A' }}>
            Real-time signals from sisters near you
          </p>
        </div>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Live" />
      </div>

      {/* Post box */}
      <div className="rounded-2xl p-4 mb-5"
        style={{ background: 'white', border: '1px solid rgba(196,149,106,0.2)' }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share what you are experiencing nearby..."
          className="w-full text-sm text-[#2C1A0E] outline-none resize-none"
          style={{ background: 'transparent', border: 'none', minHeight: '70px' }}
        />

        <div className="flex items-center justify-between mt-3 pt-3"
          style={{ borderTop: '0.5px solid rgba(196,149,106,0.15)' }}
        >
          {/* Anonymous toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              className="relative w-8 h-4 rounded-full transition-colors duration-200"
              style={{ background: isAnon ? '#F4A7B9' : '#EDE4D4' }}
              onClick={() => setIsAnon(!isAnon)}
            >
              <div className="absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-200"
                style={{ left: isAnon ? '17px' : '2px' }}
              />
            </div>
            <span className="text-xs" style={{ color: '#C4956A' }}>
              {isAnon ? 'Anonymous' : user?.fullName || 'You'}
            </span>
          </label>

          <button
            onClick={handlePost}
            disabled={posting || !text.trim()}
            className="px-4 py-2 rounded-xl text-xs font-medium text-white disabled:opacity-50 transition-all"
            style={{ background: '#5C1F1F' }}
          >
            {posting ? 'Posting...' : 'Share'}
          </button>
        </div>
      </div>

      {/* Posts list */}
      {loading ? (
        <div className="text-center py-8 text-sm" style={{ color: '#C4956A' }}>
          Loading nearby posts...
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-8 rounded-2xl"
          style={{ background: 'white', border: '1px solid rgba(196,149,106,0.15)' }}
        >
          <div className="text-2xl mb-2">🌿</div>
          <p className="text-sm" style={{ color: '#C4956A' }}>
            No reports nearby — this area seems safe
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post._id} className="rounded-2xl overflow-hidden"
              style={{ background: 'white', border: '1px solid rgba(196,149,106,0.15)' }}
            >
              <div className="p-4">
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
                      style={{ background: post.type === 'distress' ? '#7C1D1D' : '#2D6A4F' }}
                    >
                      {post.userName === 'Anonymous'
                        ? '👤'
                        : post.userName?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#2C1A0E]">
                        {post.userName || 'Anonymous'}
                      </p>
                      <p className="text-[11px]" style={{ color: '#C4956A' }}>
                        📍 {post.location?.area || 'Nearby'} ·{' '}
                        {new Date(post.createdAt).toLocaleTimeString('en-IN', {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Type badge */}
                  <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      background: post.type === 'distress' ? '#FCEBEB' : '#EAF3DE',
                      color:      post.type === 'distress' ? '#791F1F' : '#27500A',
                    }}
                  >
                    {post.type === 'distress' ? '⚠ Distress' : '📢 General'}
                  </span>
                </div>

                {/* Post text */}
                <p className="text-sm text-[#2C1A0E] mb-4 leading-relaxed">
                  {post.text}
                </p>

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  {!post.helped && (
                    <button onClick={() => handleHelp(post._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:scale-105"
                      style={{ background: '#2D6A4F' }}
                    >
                      🤝 I'll Help
                      {post.helpCount > 0 && (
                        <span className="ml-1 bg-white/20 px-1.5 rounded-full">
                          {post.helpCount}
                        </span>
                      )}
                    </button>
                  )}

                  {post.helped && (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                      style={{ background: 'rgba(45,106,79,0.1)', color: '#2D6A4F' }}
                    >
                      ✓ You responded
                    </span>
                  )}

                  {/* Private chat button */}
                  <button onClick={() => openChat(post)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
                    style={{ border: '1px solid rgba(196,149,106,0.3)', color: '#C4956A' }}
                  >
                    💬 Private Chat
                  </button>
                </div>
              </div>

              {/* Chat panel — inline */}
              {activeChatId === `chat_${post._id}` && (
                <div className="border-t" style={{ borderColor: 'rgba(196,149,106,0.15)' }}>
                  {/* Chat header */}
                  <div className="flex items-center justify-between px-4 py-2"
                    style={{ background: 'rgba(196,149,106,0.06)' }}
                  >
                    <p className="text-xs font-medium" style={{ color: '#C4956A' }}>
                      💬 Private Chat — {post.userName}
                    </p>
                    <button onClick={() => setActiveChatId(null)}
                      className="text-xs" style={{ color: '#C4956A' }}
                    >
                      ✕ Close
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="px-4 py-3 space-y-2 overflow-y-auto"
                    style={{ maxHeight: '200px' }}
                  >
                    {chatMessages.length === 0 && (
                      <p className="text-xs text-center py-4" style={{ color: '#C4956A' }}>
                        Start the conversation — say hi 👋
                      </p>
                    )}
                    {chatMessages.map((msg, i) => (
                      <div key={i}
                        className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="max-w-[70%] rounded-xl px-3 py-2"
                          style={{
                            background: msg.self ? '#5C1F1F' : 'rgba(196,149,106,0.1)',
                            color:      msg.self ? 'white' : '#2C1A0E',
                          }}
                        >
                          {!msg.self && (
                            <p className="text-[10px] mb-1 opacity-70">{msg.userName}</p>
                          )}
                          <p className="text-xs">{msg.text}</p>
                          <p className="text-[10px] mt-1 opacity-60">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat input */}
                  <div className="flex gap-2 px-4 pb-3">
                    <input
                      value={chatText}
                      onChange={(e) => setChatText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 rounded-xl text-xs text-[#2C1A0E] outline-none"
                      style={{ background: 'rgba(196,149,106,0.08)', border: '1px solid rgba(196,149,106,0.2)' }}
                    />
                    <button onClick={sendChat} disabled={!chatText.trim()}
                      className="px-3 py-2 rounded-xl text-xs font-medium text-white disabled:opacity-50"
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