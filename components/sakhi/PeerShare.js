'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/axios'

const FALLBACK = [
  {
    _id: 'f1',
    userName: 'Anonymous Sakhi',
    text: 'I learned to listen to my body\'s rhythms instead of fighting them. Game changer.',
    location: { area: 'Mumbai' },
  },
  {
    _id: 'f2',
    userName: 'Anonymous Sakhi',
    text: 'The Gupt Mandir gave me courage to ask questions I was too ashamed to speak aloud.',
    location: { area: 'Delhi' },
  },
  {
    _id: 'f3',
    userName: 'Anonymous Sakhi',
    text: 'Tracking my cycle with Ayurvedic wisdom helped me understand myself so deeply.',
    location: { area: 'Bangalore' },
  },
]

export default function PeerShare() {
  const [posts,     setPosts]     = useState([])
  const [loading,   setLoading]   = useState(true)
  const [showForm,  setShowForm]  = useState(false)
  const [story,     setStory]     = useState('')
  const [posting,   setPosting]   = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error,     setError]     = useState('')

  // ── Fetch real posts ────────────────────────────────────────────────────
  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/peer')
      // Real posts hain toh dikhao, warna fallback
      setPosts(data.posts?.length > 0 ? data.posts : FALLBACK)
    } catch (err) {
      console.error('PeerShare fetch failed:', err)
      setPosts(FALLBACK)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPosts() }, [])

  // ── Submit story ────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!story.trim()) return
    setPosting(true)
    setError('')
    try {
      const { data } = await api.post('/peer', { text: story })
      // Turant list mein add karo
      setPosts((prev) => [data.post, ...prev])
      setSubmitted(true)
      setShowForm(false)
      setStory('')
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      setError('Could not share. Please try again.')
    } finally {
      setPosting(false)
    }
  }

  return (
    <div className="rounded-2xl p-6"
      style={{ background: '#FFF8F0', border: '1px solid rgba(232,180,184,0.3)' }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl text-[#2C1A0E] mb-1"
            style={{ fontFamily: 'Yatra One, cursive' }}
          >
            Sisters' Stories
          </h2>
          <p className="text-xs" style={{ color: '#C4956A' }}>
            Anonymous community sharing
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-xl text-sm font-medium text-[#2C1A0E] hover:scale-105 transition-all"
          style={{ background: 'linear-gradient(to right, #E8B4B8, #F4A7B9)' }}
        >
          Share yours →
        </button>
      </div>

      {/* Success message */}
      {submitted && (
        <div className="rounded-xl p-4 mb-6 text-sm text-[#2C1A0E]"
          style={{ background: 'rgba(45,106,79,0.1)' }}
        >
          Thank you for sharing! Your story will help another sister. 🌸
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="rounded-xl p-4 mb-6"
          style={{ background: 'white', border: '1px solid rgba(244,167,185,0.3)' }}
        >
          <p className="text-xs mb-2" style={{ color: '#C4956A' }}>
            Share anonymously — no name, no judgment
          </p>
          {error && <p className="text-xs mb-2 text-red-500">{error}</p>}
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Share your experience, tip, or feeling..."
            className="w-full p-3 rounded-lg text-sm text-[#2C1A0E] outline-none resize-none"
            style={{
              background: '#FFF8F0',
              border:     '1px solid rgba(232,180,184,0.4)',
              height:     '80px',
            }}
          />
          <div className="flex gap-3 mt-3">
            <button
              onClick={handleSubmit}
              disabled={posting || !story.trim()}
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#2C1A0E] disabled:opacity-60"
              style={{ background: 'linear-gradient(to right, #E8B4B8, #F4A7B9)' }}
            >
              {posting ? 'Sharing...' : 'Share'}
            </button>
            <button
              onClick={() => { setShowForm(false); setError('') }}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ color: '#C4956A', border: '1px solid rgba(196,149,106,0.3)' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Posts grid */}
      {loading ? (
        <div className="text-center py-8 text-sm" style={{ color: '#C4956A' }}>
          Loading stories...
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post._id} className="rounded-xl p-5"
              style={{
                background: 'linear-gradient(135deg, white, rgba(244,167,185,0.08))',
                border:     '1px solid rgba(232,180,184,0.3)',
              }}
            >
              <div className="mb-3">
                <svg width="36" height="26" viewBox="0 0 40 30">
                  <path d="M0 15 Q0 0 10 0 T20 15 Q20 25 10 30 L5 20 Q10 18 10 15 Q10 10 5 10 Q0 10 0 15"
                    fill="#F4A7B9" opacity="0.4" />
                  <path d="M20 15 Q20 0 30 0 T40 15 Q40 25 30 30 L25 20 Q30 18 30 15 Q30 10 25 10 Q20 10 20 15"
                    fill="#F4A7B9" opacity="0.4" />
                </svg>
              </div>
              <p className="text-sm text-[#2C1A0E] italic mb-4 leading-relaxed">
                "{post.text}"
              </p>
              <div className="pt-3" style={{ borderTop: '0.5px solid rgba(232,180,184,0.3)' }}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-medium" style={{ color: '#C4956A' }}>
                      {post.userName || 'Anonymous Sakhi'}
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(196,149,106,0.7)' }}>
                      {post.location?.area || 'Sakhi Community'}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: '#FBEAF0', color: '#72243E' }}
                  >
                    {new Date(post.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short'
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}