'use client'

import { useState } from 'react'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const getDayType = (day) => {
  if (day >= 1  && day <= 5)  return 'period'
  if (day >= 6  && day <= 8)  return 'normal'
  if (day >= 9  && day <= 16) return 'fertile'
  if (day >= 17 && day <= 21) return 'normal'
  if (day >= 22 && day <= 28) return 'pms'
  return 'normal'
}

const TYPE_CONFIG = {
  period:  { bg: '#FCEBEB', color: '#791F1F', label: 'Period',   dot: '#E24B4A' },
  fertile: { bg: '#FBEAF0', color: '#72243E', label: 'Fertile',  dot: '#D4537E' },
  normal:  { bg: '#EAF3DE', color: '#27500A', label: 'Normal',   dot: '#639922' },
  pms:     { bg: '#EEEDFE', color: '#3C3489', label: 'PMS',      dot: '#7F77DD' },
}

const TODAY = 14
const TOTAL_DAYS = 28

export default function CycleCalendar({ onDaySelect }) {
  const [selectedDay, setSelectedDay] = useState(TODAY)
  const [currentMonth] = useState(new Date().getMonth())

  const handleSelect = (day) => {
    setSelectedDay(day)
    if (onDaySelect) onDaySelect(day)
  }

  const selectedType = getDayType(selectedDay)
  const selectedConfig = TYPE_CONFIG[selectedType]

  return (
    <div className="bg-white rounded-2xl p-6"
      style={{ border: '1px solid rgba(212,160,23,0.25)' }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium text-[#1C1008]"
            style={{ fontFamily: 'Yatra One, cursive' }}
          >
            {MONTHS[currentMonth]} — Cycle Calendar
          </h3>
          <p className="text-xs text-[#6B5D4F]">
            Day {selectedDay} · {selectedConfig.label} phase
          </p>
        </div>
        <span className="text-xs px-3 py-1.5 rounded-full font-medium"
          style={{ background: selectedConfig.bg, color: selectedConfig.color }}
        >
          {selectedConfig.label}
        </span>
      </div>

      {/* Phase legend */}
      <div className="flex gap-2 flex-wrap mb-5">
        {Object.entries(TYPE_CONFIG).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: val.dot }}/>
            <span className="text-xs text-[#6B5D4F]">{val.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#F97316' }}/>
          <span className="text-xs text-[#6B5D4F]">Today</span>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map((d) => (
          <div key={d} className="text-center text-xs text-[#6B5D4F] py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1.5 mb-5">
        {/* First day offset — starts on Monday */}
        <div />
        {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map((day) => {
          const type = getDayType(day)
          const config = TYPE_CONFIG[type]
          const isToday = day === TODAY
          const isSelected = day === selectedDay && !isToday

          return (
            <button
              key={day}
              onClick={() => handleSelect(day)}
              className="h-9 rounded-lg text-xs font-medium transition-all duration-150 hover:scale-110 relative"
              style={{
                background: isToday ? '#F97316' : config.bg,
                color: isToday ? 'white' : config.color,
                outline: isSelected ? `2px solid ${config.dot}` : 'none',
                outlineOffset: '1px',
              }}
            >
              {day}
              {isToday && (
                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
              )}
            </button>
          )
        })}
      </div>

      {/* Phase info for selected day */}
      <div className="rounded-xl p-4"
        style={{ background: selectedConfig.bg, border: `1px solid ${selectedConfig.dot}33` }}
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm font-medium" style={{ color: selectedConfig.color }}>
              Day {selectedDay} — {selectedConfig.label} Phase
            </p>
            <p className="text-xs mt-0.5" style={{ color: selectedConfig.color, opacity: 0.8 }}>
              {selectedType === 'period'  && 'Your period days. Rest well and stay warm.'}
              {selectedType === 'fertile' && 'Peak fertility window. Your energy is high!'}
              {selectedType === 'normal'  && 'Normal phase. Great time for new activities.'}
              {selectedType === 'pms'     && 'PMS phase. Be extra gentle with yourself.'}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0"
            style={{ background: 'white' }}
          >
            {selectedType === 'period'  && '🌹'}
            {selectedType === 'fertile' && '🌸'}
            {selectedType === 'normal'  && '🌿'}
            {selectedType === 'pms'     && '🌙'}
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { num: '12',     label: 'Days to next'   },
          { num: '28 day', label: 'Cycle length'   },
          { num: 'Cycle 3', label: 'This year'     },
        ].map((s) => (
          <div key={s.label} className="text-center rounded-xl p-3"
            style={{ background: '#FFF8F0' }}
          >
            <div className="text-sm font-medium mb-0.5" style={{ color: '#F97316' }}>
              {s.num}
            </div>
            <div className="text-xs text-[#6B5D4F]">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}