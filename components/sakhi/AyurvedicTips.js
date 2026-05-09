'use client'

import { useState } from 'react'

const ALL_REMEDIES = [
  {
    id: 1, icon: '🌿',
    name: 'Golden Milk',
    description: 'Warm turmeric milk for inflammation and comfort',
    ingredients: 'Turmeric, milk, honey, black pepper',
    benefits: 'Anti-inflammatory, aids sleep, boosts immunity',
    phases: ['menstrual', 'luteal'],
  },
  {
    id: 2, icon: '🫚',
    name: 'Ginger Tea',
    description: 'Digestive comfort and cramp relief',
    ingredients: 'Fresh ginger, water, honey, lemon',
    benefits: 'Reduces bloating, relieves cramps, eases nausea',
    phases: ['menstrual', 'luteal'],
  },
  {
    id: 3, icon: '🌱',
    name: 'Ashwagandha',
    description: 'Adaptogen for stress and hormonal balance',
    ingredients: 'Ashwagandha root powder with warm milk',
    benefits: 'Reduces stress, improves energy, balances hormones',
    phases: ['follicular', 'luteal'],
  },
  {
    id: 4, icon: '🍯',
    name: 'Triphala',
    description: 'Three-fruit blend for digestive harmony',
    ingredients: 'Amalaki, Bibhitaki, Haritaki',
    benefits: 'Detoxification, digestion, vitality',
    phases: ['follicular', 'ovulation'],
  },
  {
    id: 5, icon: '🌸',
    name: 'Shatavari',
    description: 'Sacred herb for female reproductive health',
    ingredients: 'Shatavari root powder with warm milk',
    benefits: 'Supports reproductive health, hormonal balance',
    phases: ['ovulation', 'follicular'],
  },
  {
    id: 6, icon: '💧',
    name: 'Cumin Water',
    description: 'Daily digestive tonic for wellness',
    ingredients: 'Cumin seeds steeped in warm water',
    benefits: 'Aids digestion, reduces bloating, cools body',
    phases: ['menstrual', 'follicular', 'ovulation', 'luteal'],
  },
]

export default function AyurvedicTips({ phase = null }) {
  const [expanded, setExpanded] = useState(null)

  // Phase ke according filter karo
  const remedies = phase
    ? ALL_REMEDIES.filter((r) => r.phases.includes(phase))
    : ALL_REMEDIES

  return (
    <div className="rounded-2xl p-6"
      style={{
        background: '#FFF8F0',
        border: '1px solid rgba(196,149,106,0.3)',
      }}
    >
      <h2 className="text-2xl text-[#2C1A0E] mb-1"
        style={{ fontFamily: 'Yatra One, cursive' }}
      >
        Ancient Remedies
      </h2>
      <p className="text-xs mb-5" style={{ color: '#C4956A' }}>
        {phase
          ? `Remedies for your ${phase} phase`
          : 'Ayurvedic wisdom for modern women'}
      </p>

      <div className="space-y-3">
        {remedies.map((r) => (
          <div key={r.id}>
            <div
              onClick={() => setExpanded(expanded === r.id ? null : r.id)}
              className="flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.01]"
              style={{
                background: expanded === r.id ? 'white' : 'rgba(255,255,255,0.6)',
                border: expanded === r.id
                  ? '1px solid rgba(244,167,185,0.5)'
                  : '1px solid rgba(196,149,106,0.2)',
              }}
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: '#FAEEDA' }}
              >
                {r.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#2C1A0E] mb-0.5">
                  {r.name}
                </p>
                <p className="text-xs italic truncate"
                  style={{ color: '#C4956A' }}
                >
                  {r.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="text-xs flex-shrink-0 transition-transform duration-200"
                style={{
                  color: '#C4956A',
                  transform: expanded === r.id ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
              >
                ▶
              </div>
            </div>

            {/* Expanded details */}
            {expanded === r.id && (
              <div className="mx-2 mt-1 p-4 rounded-xl"
                style={{
                  background: 'white',
                  borderLeft: '3px solid #F4A7B9',
                  animation: 'reveal 0.3s ease-out',
                }}
              >
                <div className="mb-2">
                  <span className="text-xs font-medium" style={{ color: '#C4956A' }}>
                    Ingredients:
                  </span>
                  <span className="text-xs text-[#2C1A0E] ml-1">
                    {r.ingredients}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-medium" style={{ color: '#C4956A' }}>
                    Benefits:
                  </span>
                  <span className="text-xs text-[#2C1A0E] ml-1">
                    {r.benefits}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}