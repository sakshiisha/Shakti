'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/axios'

export default function CommunityFeed({ location }) {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [text,    setText]    = useState('')
  const [posting, setPosting] = useState(false)

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

  const handleHelp = async (postId) => {
    try {
      await api.put(`/community/help/${postId}`)
      setPosts(posts.map((p) =>
        p._id === postId ? { ...p, helped: true } : p
      ))
    } catch (err) {
      console.error('Help failed:', err)
    }
  }

  const handlePost = async () => {
    if (!text.trim()) return
    setPosting(true)
    try {
      await api.post('/community/create', {
        text,
        lat:  location?.lat || 0,
        lng:  location?.lng || 0,
        area: 'Nearby area',
        type: 'distress',
      })
      setText('')
      fetchPosts()
    } catch (err) {
      console.error('Post failed:', err)
    } finally {
      setPosting(false)
    }
  }

 return (
  <div className="px-1 sm:px-0">
    <h2
      className="text-xl sm:text-2xl text-[#2C1A0E] mb-1 sm:mb-2"
      style={{ fontFamily: 'Yatra One, cursive' }}
    >
      Nearby Voices
    </h2>

    <p className="text-xs sm:text-sm mb-4 sm:mb-5" style={{ color: '#C4956A' }}>
      Real-time signals from sisters near you
    </p>

    {/* Post something */}
    <div
      className="rounded-2xl p-3 sm:p-4 mb-5 sm:mb-6"
      style={{ background: 'white', border: '1px solid rgba(196,149,106,0.2)' }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share what you are experiencing nearby..."
        className="w-full text-sm text-[#2C1A0E] outline-none resize-none"
        style={{ background: 'transparent', border: 'none', minHeight: '80px' }}
      />

      <div className="flex justify-end mt-3">
        <button
          onClick={handlePost}
          disabled={posting || !text.trim()}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-white disabled:opacity-50"
          style={{ background: '#5C1F1F' }}
        >
          {posting ? 'Posting...' : 'Share anonymously'}
        </button>
      </div>
    </div>

    {/* Posts */}
    {loading ? (
      <div className="text-center py-8 text-sm" style={{ color: '#C4956A' }}>
        Loading nearby posts...
      </div>
    ) : posts.length === 0 ? (
      <div
        className="text-center py-8 rounded-2xl"
        style={{ background: 'white', border: '1px solid rgba(196,149,106,0.15)' }}
      >
        <p className="text-sm" style={{ color: '#C4956A' }}>
          No reports nearby — this area seems safe 🌿
        </p>
      </div>
    ) : (
      <div className="space-y-3 sm:space-y-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="rounded-2xl p-4 sm:p-5"
            style={{ background: 'white', borderLeft: '4px solid #F5C842' }}
          >
            {/* top row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <span className="text-[11px] sm:text-xs leading-relaxed" style={{ color: '#C4956A' }}>
                📍 {post.location?.area || 'Nearby'} ·{' '}
                {new Date(post.createdAt).toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                · Anonymous
              </span>

              {post.helped && (
                <span
                  className="text-[11px] sm:text-xs px-2 py-1 rounded-full w-fit"
                  style={{ background: 'rgba(45,106,79,0.1)', color: '#2D6A4F' }}
                >
                  You responded ✓
                </span>
              )}
            </div>

            <p className="text-sm text-[#2C1A0E] mb-4 leading-relaxed">
              {post.text}
            </p>

            {!post.helped ? (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => handleHelp(post._id)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-white"
                  style={{ background: '#2D6A4F' }}
                >
                  I'll Help 🤝
                </button>

                <button
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium"
                  style={{
                    border: '1px solid #F5C842',
                    color: '#C4956A',
                    background: 'transparent',
                  }}
                >
                  Alert Nearby
                </button>
              </div>
            ) : (
              <p className="text-xs mt-2" style={{ color: '#2D6A4F' }}>
                Thank you for responding. Stay safe 🌸
              </p>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
)
}