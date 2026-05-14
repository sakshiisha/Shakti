'use client'

import { useState } from 'react'
import api from '@/lib/axios'

const TESTIMONIALS = [
  {
    id: 1,
    quote: "I learned to listen to my body's rhythms instead of fighting them. Game changer.",
    author: 'Anonymous Sakhi',
    location: 'Mumbai',
    mood: 'Joyful',
  },
  {
    id: 2,
    quote: 'The Gupt Mandir gave me courage to ask questions I was too ashamed to speak aloud.',
    author: 'Anonymous Sakhi',
    location: 'Delhi',
    mood: 'Peaceful',
  },
  {
    id: 3,
    quote: 'Tracking my cycle with Ayurvedic wisdom helped me understand myself so deeply.',
    author: 'Anonymous Sakhi',
    location: 'Bangalore',
    mood: 'Joyful',
  },
]

export default function PeerShare() {
  const [showForm,  setShowForm]  = useState(false)
  const [story,     setStory]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [posting,   setPosting]   = useState(false)
  const [error,     setError]     = useState('')

  const handleSubmit = async () => {
    if (!story.trim()) return
    setPosting(true)
    setError('')
    try {
      // Community post as general type
      await api.post('/community/create', {
        text:        story,
        lat:         0,
        lng:         0,
        area:        'Sakhi Community',
        type:        'general',
        isAnonymous: true,
      })
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
        <button onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-xl text-sm font-medium text-[#2C1A0E] hover:scale-105 transition-all"
          style={{ background: 'linear-gradient(to right, #E8B4B8, #F4A7B9)' }}
        >
          Share yours →
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl p-4 mb-6"
          style={{ background: 'white', border: '1px solid rgba(244,167,185,0.3)' }}
        >
          <p className="text-xs mb-2" style={{ color: '#C4956A' }}>
            Share anonymously — no name, no judgment
          </p>
          {error && (
            <p className="text-xs mb-2 text-red-500">{error}</p>
          )}
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Share your experience, tip, or feeling..."
            className="w-full p-3 rounded-lg text-sm text-[#2C1A0E] outline-none resize-none"
            style={{ background: '#FFF8F0', border: '1px solid rgba(232,180,184,0.4)', height: '80px' }}
          />
          <div className="flex gap-3 mt-3">
            <button onClick={handleSubmit} disabled={posting || !story.trim()}
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#2C1A0E] disabled:opacity-60"
              style={{ background: 'linear-gradient(to right, #E8B4B8, #F4A7B9)' }}
            >
              {posting ? 'Sharing...' : 'Share'}
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
          Thank you for sharing! Your story will help another sister. 🌸
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t) => (
          <div key={t.id} className="rounded-xl p-5"
            style={{
              background: 'linear-gradient(135deg, white, rgba(244,167,185,0.08))',
              border: '1px solid rgba(232,180,184,0.3)',
            }}
          >
            <div className="mb-3">
              <svg width="36" height="26" viewBox="0 0 40 30">
                <path d="M0 15 Q0 0 10 0 T20 15 Q20 25 10 30 L5 20 Q10 18 10 15 Q10 10 5 10 Q0 10 0 15" fill="#F4A7B9" opacity="0.4"/>
                <path d="M20 15 Q20 0 30 0 T40 15 Q40 25 30 30 L25 20 Q30 18 30 15 Q30 10 25 10 Q20 10 20 15" fill="#F4A7B9" opacity="0.4"/>
              </svg>
            </div>
            <p className="text-sm text-[#2C1A0E] italic mb-4 leading-relaxed">
              "{t.quote}"
            </p>
            <div className="pt-3" style={{ borderTop: '0.5px solid rgba(232,180,184,0.3)' }}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-medium" style={{ color: '#C4956A' }}>{t.author}</p>
                  <p className="text-xs" style={{ color: 'rgba(196,149,106,0.7)' }}>{t.location}</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: '#FBEAF0', color: '#72243E' }}
                >
                  {t.mood}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}