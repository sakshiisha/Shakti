'use client'

import { useState } from 'react'

const MOODS = [
  { emoji: '😊', label: 'Joyful',   affirmation: 'Your light brightens the world around you.'          },
  { emoji: '😌', label: 'Peaceful', affirmation: 'You are grounded in sacred stillness.'               },
  { emoji: '😔', label: 'Sad',      affirmation: 'Your feelings are valid. You are held in love.'      },
  { emoji: '😰', label: 'Anxious',  affirmation: 'Breathe deeply. You are safe, you are strong.'       },
  { emoji: '😤', label: 'Angry',    affirmation: 'Your fire has purpose. Channel it with wisdom.'      },
  { emoji: '😴', label: 'Tired',    affirmation: "Rest is sacred. Honor your body's wisdom."           },
]

export default function MoodCheckin() {
  const [selected, setSelected] = useState(null)
  const [showAffirmation, setShowAffirmation] = useState(false)

  const handleClick = (i) => {
    setSelected(i)
    setShowAffirmation(false)
    setTimeout(() => setShowAffirmation(true), 300)
  }

  return (
    <div className="rounded-2xl p-6"
      style={{ background: '#FFF8F0', border: '1px solid rgba(232,180,184,0.3)', boxShadow: '0 4px 24px rgba(196,149,106,0.1)' }}
    >
      <h2 className="text-2xl text-[#2C1A0E] mb-1"
        style={{ fontFamily: 'Yatra One, cursive' }}
      >
        How are you feeling?
      </h2>
      <p className="text-xs mb-5" style={{ color: '#C4956A' }}>
        Check in with yourself today
      </p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {MOODS.map((mood, i) => (
          <button key={i}
            onClick={() => handleClick(i)}
            className="rounded-xl p-4 text-center transition-all duration-300 hover:scale-105"
            style={{
              background: selected === i ? 'linear-gradient(135deg, #F4A7B9/20, #E8B4B8/20)' : 'white',
              border: selected === i ? '2px solid #F4A7B9' : '1px solid rgba(232,180,184,0.3)',
            }}
          >
            <div className="text-3xl mb-2">{mood.emoji}</div>
            <div className="text-xs text-[#2C1A0E] font-medium">{mood.label}</div>
          </button>
        ))}
      </div>

      {selected !== null && showAffirmation && (
        <div className="rounded-xl p-5 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(244,167,185,0.15), rgba(232,180,184,0.15))',
            border: '1px solid rgba(232,180,184,0.4)',
            animation: 'reveal 0.4s ease-out'
          }}
        >
          <div className="text-4xl mb-3">{MOODS[selected].emoji}</div>
          <p className="text-base text-[#2C1A0E] italic leading-relaxed">
            "{MOODS[selected].affirmation}"
          </p>
          <div className="mt-4 flex justify-center gap-3">
            {['#F5C842', '#F4A7B9', '#E8B4B8'].map((c, i) => (
              <div key={i} className="w-2 h-2 rounded-full"
                style={{ background: c, animation: `twinkle 1.5s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}