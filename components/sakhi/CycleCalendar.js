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
    onDaySelect?.(day)
  }

  const selectedType = getDayType(selectedDay)
  const selectedConfig = TYPE_CONFIG[selectedType]

  return (
    <div
      className="bg-white rounded-2xl p-4 sm:p-6"
      style={{ border: '1px solid rgba(212,160,23,0.25)' }}
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3
            className="text-base sm:text-lg font-medium text-[#1C1008]"
            style={{ fontFamily: 'Yatra One, cursive' }}
          >
            {MONTHS[currentMonth]} — Cycle Calendar
          </h3>

          <p className="text-[11px] sm:text-xs text-[#6B5D4F]">
            Day {selectedDay} · {selectedConfig.label} phase
          </p>
        </div>

        <span
          className="self-start sm:self-auto text-[11px] sm:text-xs px-3 py-1 rounded-full font-medium"
          style={{ background: selectedConfig.bg, color: selectedConfig.color }}
        >
          {selectedConfig.label}
        </span>
      </div>

      {/* LEGEND */}
      <div className="flex gap-3 flex-wrap mb-4">
        {Object.entries(TYPE_CONFIG).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: val.dot }} />
            <span className="text-[11px] sm:text-xs text-[#6B5D4F]">{val.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500"/>
          <span className="text-[11px] sm:text-xs text-[#6B5D4F]">Today</span>
        </div>
      </div>

      {/* WEEK DAYS */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map((d) => (
          <div key={d} className="text-center text-[10px] sm:text-xs text-[#6B5D4F] py-1">
            {d}
          </div>
        ))}
      </div>

      {/* CALENDAR GRID */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-4">
        <div /> {/* offset */}

        {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map((day) => {
          const type = getDayType(day)
          const config = TYPE_CONFIG[type]
          const isToday = day === TODAY
          const isSelected = day === selectedDay && !isToday

          return (
            <button
              key={day}
              onClick={() => handleSelect(day)}
              className="
                h-10 sm:h-9 
                rounded-lg 
                text-[11px] sm:text-xs 
                font-medium 
                active:scale-95 
                transition
                relative
              "
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

      {/* SELECTED INFO */}
      <div
        className="rounded-xl p-3 sm:p-4"
        style={{ background: selectedConfig.bg, border: `1px solid ${selectedConfig.dot}33` }}
      >
        <div className="flex gap-3 items-start">
          <div className="flex-1">
            <p className="text-sm font-medium" style={{ color: selectedConfig.color }}>
              Day {selectedDay} — {selectedConfig.label} Phase
            </p>

            <p className="text-xs mt-1 leading-relaxed" style={{ color: selectedConfig.color, opacity: 0.85 }}>
              {selectedType === 'period'  && 'Your period days. Rest well and stay warm.'}
              {selectedType === 'fertile' && 'Peak fertility window. Your energy is high!'}
              {selectedType === 'normal'  && 'Normal phase. Great time for new activities.'}
              {selectedType === 'pms'     && 'PMS phase. Be extra gentle with yourself.'}
            </p>
          </div>

          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg bg-white">
            {selectedType === 'period'  && '🌹'}
            {selectedType === 'fertile' && '🌸'}
            {selectedType === 'normal'  && '🌿'}
            {selectedType === 'pms'     && '🌙'}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
        {[
          { num: '12', label: 'Days to next' },
          { num: '28 day', label: 'Cycle length' },
          { num: 'Cycle 3', label: 'This year' },
        ].map((s) => (
          <div key={s.label} className="text-center rounded-xl p-2 sm:p-3" style={{ background: '#FFF8F0' }}>
            <div className="text-sm font-medium mb-0.5 text-orange-500">{s.num}</div>
            <div className="text-[11px] sm:text-xs text-[#6B5D4F]">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}