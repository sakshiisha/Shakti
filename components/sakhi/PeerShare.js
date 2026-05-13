'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/axios'

export default function PeerShare() {
  const [showForm,  setShowForm]  = useState(false)
  const [story,     setStory]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [posts,     setPosts]     = useState([])

  // ⭐ fetch posts from backend
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await api.get('/peershare')
      setPosts(res.data.posts)
    } catch (err) {
      console.log('fetch peershare error', err)
    }
  }

  // ⭐ send post to backend
  const handleSubmit = async () => {
    if (!story.trim()) return

    try {
      await api.post('/peershare', { text: story })
      setSubmitted(true)
      setShowForm(false)
      setStory('')
      fetchPosts() // refresh posts

      setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      console.log('create post error', err)
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
          className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 text-[#2C1A0E]"
          style={{ background: 'linear-gradient(to right, #E8B4B8, #F4A7B9)' }}
        >
          Share yours →
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="rounded-xl p-4 mb-6"
          style={{ background: 'white', border: '1px solid rgba(244,167,185,0.3)' }}
        >
          <p className="text-xs mb-2" style={{ color: '#C4956A' }}>
            Share anonymously — no name, no judgment
          </p>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Share your experience, tip, or feeling..."
            className="w-full p-3 rounded-lg text-sm text-[#2C1A0E] outline-none resize-none"
            style={{ background: '#FFF8F0', border: '1px solid rgba(232,180,184,0.4)', height: '80px' }}
          />
          <div className="flex gap-3 mt-3">
            <button onClick={handleSubmit}
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#2C1A0E]"
              style={{ background: 'linear-gradient(to right, #E8B4B8, #F4A7B9)' }}
            >
              Share
            </button>
            <button onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg text-sm"
              style={{ color: '#C4956A', border: '1px solid rgba(196,149,106,0.3)' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {submitted && (
        <div className="rounded-xl p-4 mb-6 text-sm text-[#2C1A0E]"
          style={{ background: 'rgba(45,106,79,0.1)' }}
        >
          Thank you for sharing! Your story will help another sister 🌸
        </div>
      )}

      {/* ⭐ REAL POSTS */}
      <div className="grid md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post._id} className="rounded-xl p-5"
            style={{
              background: 'linear-gradient(135deg, white, rgba(244,167,185,0.08))',
              border: '1px solid rgba(232,180,184,0.3)',
            }}
          >
            <p className="text-sm text-[#2C1A0E] italic leading-relaxed">
              "{post.text}"
            </p>

            <div className="mt-4 pt-3 text-xs"
              style={{ borderTop: '0.5px solid rgba(232,180,184,0.3)', color:'#C4956A' }}
            >
              Anonymous Sakhi
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}