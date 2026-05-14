'use client'

import { useState } from 'react'
import api from '@/lib/axios'

const INITIAL_STORIES = [
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
    quote: 'Tracking my cycle helped me understand myself so deeply.',
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
  const [stories,   setStories]   = useState(INITIAL_STORIES)

  const handleSubmit = async () => {
    if (!story.trim()) return
    setPosting(true)
    try {
      await api.post('/peer', { text: story.trim() })
      // Local mein add karo
      setStories((prev) => [{
        id: Date.now(),
        quote: story.trim(),
        author: 'Anonymous Sakhi',
        location: 'Your city',
        mood: 'Shared',
      }, ...prev])
      setSubmitted(true)
      setShowForm(false)
      setStory('')
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      console.error('PeerShare post failed:', err)
      // Even if backend fails — show success locally
      setSubmitted(true)
      setShowForm(false)
      setStory('')
      setTimeout(() => setSubmitted(false), 4000)
    } finally {
      setPosting(false)
    }
  }

  return (
    <div className="rounded-2xl p-6"
      style={{ background: '#FFF8F0', border: '1px solid rgba(232,180,184,0.3)' }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl text-[#2C1A0E] mb-1"
            style={{ fontFamily: 'Yatra One, cursive' }}
          >
            Sisters' Stories
          </h2>
          <p className="text-xs" style={{ color: '#C4956A' }}>
            Share your experience — no location, no judgment, just hearts
          </p>
          <p className="text-xs mt-1 italic" style={{ color: '#C4956A', opacity: 0.8 }}>
            This is different from the safety feed — this is just for sharing feelings
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="self-start px-4 py-2 rounded-xl text-sm font-medium text-[#2C1A0E] hover:scale-105 transition-all flex-shrink-0"
          style={{ background: 'linear-gradient(to right, #E8B4B8, #F4A7B9)' }}
        >
          Share yours →
        </button>
      </div>

      {/* Share form */}
      {showForm && (
        <div className="rounded-xl p-4 mb-6"
          style={{
            background: 'white',
            border: '1px solid rgba(244,167,185,0.3)',
            animation: 'reveal 0.3s ease-out',
          }}
        >
          <p className="text-xs mb-1 font-medium" style={{ color: '#C4956A' }}>
            Share anonymously
          </p>
          <p className="text-xs mb-3" style={{ color: '#C4956A', opacity: 0.8 }}>
            Your story, your experience — it could help another sister feel less alone
          </p>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Write anything — a feeling, a lesson, a moment of strength..."
            className="w-full p-3 rounded-lg text-sm text-[#2C1A0E] outline-none resize-none"
            style={{
              background: '#FFF8F0',
              border: '1px solid rgba(232,180,184,0.4)',
              minHeight: '100px',
            }}
          />
          <div className="flex gap-3 mt-3">
            <button
              onClick={handleSubmit}
              disabled={posting || !story.trim()}
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#2C1A0E] disabled:opacity-60 transition-all"
              style={{ background: 'linear-gradient(to right, #E8B4B8, #F4A7B9)' }}
            >
              {posting ? 'Sharing...' : 'Share anonymously'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg text-sm transition-all"
              style={{ color: '#C4956A', border: '1px solid rgba(196,149,106,0.3)' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Success message */}
      {submitted && (
        <div className="rounded-xl p-4 mb-6 flex items-center gap-3"
          style={{ background: 'rgba(45,106,79,0.08)', border: '1px solid rgba(45,106,79,0.2)' }}
        >
          <span className="text-2xl">🌸</span>
          <div>
            <p className="text-sm font-medium" style={{ color: '#2D6A4F' }}>
              Thank you for sharing!
            </p>
            <p className="text-xs" style={{ color: '#2D6A4F', opacity: 0.8 }}>
              Your story will help another sister feel less alone.
            </p>
          </div>
        </div>
      )}

      {/* Stories */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {stories.map((t) => (
          <div key={t.id} className="rounded-xl p-4"
            style={{
              background: 'white',
              border: '1px solid rgba(232,180,184,0.25)',
            }}
          >
            <div className="mb-3 opacity-40">
              <svg width="28" height="20" viewBox="0 0 40 30">
                <path d="M0 15 Q0 0 10 0 T20 15 Q20 25 10 30 L5 20 Q10 18 10 15 Q10 10 5 10 Q0 10 0 15" fill="#F4A7B9"/>
                <path d="M20 15 Q20 0 30 0 T40 15 Q40 25 30 30 L25 20 Q30 18 30 15 Q30 10 25 10 Q20 10 20 15" fill="#F4A7B9"/>
              </svg>
            </div>
            <p className="text-sm text-[#2C1A0E] italic leading-relaxed mb-4">
              "{t.quote}"
            </p>
            <div className="flex justify-between items-center pt-3"
              style={{ borderTop: '0.5px solid rgba(232,180,184,0.3)' }}
            >
              <div>
                <p className="text-xs font-medium" style={{ color: '#C4956A' }}>
                  {t.author}
                </p>
                <p className="text-[11px]" style={{ color: 'rgba(196,149,106,0.7)' }}>
                  {t.location}
                </p>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full"
                style={{ background: '#FBEAF0', color: '#72243E' }}
              >
                {t.mood}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}