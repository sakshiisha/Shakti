'use client'

import { useState } from 'react'
import api from '@/lib/axios'

const MOODS = [
  { id: 'joyful',   emoji: '😊', label: 'Joyful',   affirmation: 'Your light brightens the world around you.'     },
  { id: 'peaceful', emoji: '😌', label: 'Peaceful', affirmation: 'You are grounded in sacred stillness.'          },
  { id: 'sad',      emoji: '😔', label: 'Sad',      affirmation: 'Your feelings are valid. You are held in love.'  },
  { id: 'anxious',  emoji: '😰', label: 'Anxious',  affirmation: 'Breathe deeply. You are safe, you are strong.'  },
  { id: 'angry',    emoji: '😤', label: 'Angry',    affirmation: 'Your fire has purpose. Channel it with wisdom.'  },
  { id: 'tired',    emoji: '😴', label: 'Tired',    affirmation: "Rest is sacred. Honor your body's wisdom."      },
]

export default function MoodCheckin({ todayMood, setTodayMood }) {
  const [selected,        setSelected]        = useState(
    todayMood ? MOODS.findIndex(m => m.id === todayMood.mood) : null
  )
  const [showAffirmation, setShowAffirmation] = useState(!!todayMood)
  const [saving,          setSaving]          = useState(false)

  const handleClick = async (i) => {
    setSelected(i)
    setShowAffirmation(false)
    setSaving(true)
    try {
      await api.post('/mood', { mood: MOODS[i].id })
      if (setTodayMood) setTodayMood({ mood: MOODS[i].id })
    } catch (err) {
      console.error('Mood save failed:', err)
    } finally {
      setSaving(false)
      setTimeout(() => setShowAffirmation(true), 250)
    }
  }

  return (
    <div className="rounded-2xl p-4 sm:p-6"
      style={{ background: '#FFF8F0', border: '1px solid rgba(232,180,184,0.3)' }}
    >
      <h2 className="text-xl sm:text-2xl text-[#2C1A0E] mb-1"
        style={{ fontFamily: 'Yatra One, cursive' }}
      >
        How are you feeling?
      </h2>
      <p className="text-xs mb-4 sm:mb-5" style={{ color: '#C4956A' }}>
        {saving ? 'Saving...' : todayMood ? 'Today\'s mood saved ✓' : 'Check in with yourself today'}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {MOODS.map((mood, i) => (
          <button key={i} onClick={() => handleClick(i)} disabled={saving}
            className="rounded-xl p-3 sm:p-4 text-center transition active:scale-95 disabled:opacity-60"
            style={{
              background: selected === i ? 'rgba(244,167,185,0.18)' : 'white',
              border: selected === i ? '2px solid #F4A7B9' : '1px solid rgba(232,180,184,0.3)',
            }}
          >
            <div className="text-3xl mb-1 sm:mb-2">{mood.emoji}</div>
            <div className="text-xs text-[#2C1A0E] font-medium">{mood.label}</div>
          </button>
        ))}
      </div>

      {selected !== null && showAffirmation && (
        <div className="rounded-xl p-4 sm:p-5 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(244,167,185,0.15), rgba(232,180,184,0.15))',
            border: '1px solid rgba(232,180,184,0.4)',
          }}
        >
          <div className="text-4xl mb-2">{MOODS[selected].emoji}</div>
          <p className="text-sm sm:text-base text-[#2C1A0E] italic leading-relaxed px-1">
            "{MOODS[selected].affirmation}"
          </p>
          <p className="text-xs mt-2" style={{ color: '#C4956A' }}>Mood saved ✓</p>
        </div>
      )}
    </div>
  )
}