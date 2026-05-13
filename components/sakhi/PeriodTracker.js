'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/axios'

const phases = {
  menstrual:  [1, 2, 3, 4, 5],
  follicular: [6, 7, 8, 9, 10, 11, 12],
  ovulation:  [13, 14, 15, 16],
  luteal:     [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
}

const PHASE_CONFIG = {
  menstrual:  { bg: '#E8B4B8', label: 'Menstrual',  icon: '🌸', desc: "Rest and restore. Honor your body's need for slowness." },
  follicular: { bg: '#F5C842', label: 'Follicular', icon: '🌱', desc: 'Energy rising. Perfect time for new beginnings.' },
  ovulation:  { bg: '#F4A7B9', label: 'Ovulation',  icon: '🌺', desc: 'Peak vitality. Connect and create.' },
  luteal:     { bg: '#C4956A', label: 'Luteal',     icon: '🌙', desc: 'Nurture yourself. Turn inward with gentle care.' },
}

const getPhase = (day) => {
  if (phases.menstrual.includes(day))  return 'menstrual'
  if (phases.follicular.includes(day)) return 'follicular'
  if (phases.ovulation.includes(day))  return 'ovulation'
  return 'luteal'
}

export default function PeriodTracker({ periodData, setPeriodData }) {

  const TODAY = periodData?.currentDay || 1
  const [selectedDay, setSelectedDay] = useState(TODAY)

  // Sync UI when backend updates
  useEffect(() => {
    if (periodData?.currentDay) {
      setSelectedDay(periodData.currentDay)
    }
  }, [periodData])

  const currentPhase = getPhase(selectedDay)
  const config = PHASE_CONFIG[currentPhase]

  // 🔥 Update backend when user selects a day
  const updateCycleFromDay = async (day) => {
    try {
      const cycleLength  = periodData?.cycleLength  || 28
      const periodLength = periodData?.periodLength || 5

      const lastPeriodStart = new Date(
        Date.now() - (day - 1) * 24 * 60 * 60 * 1000
      )

      const res = await api.put('/period/update', {
        cycleLength,
        periodLength,
        lastPeriodStart,
      })

      setPeriodData(res.data.data)
    } catch (err) {
      console.error('Period update failed', err)
    }
  }

  return (
    <div className="rounded-2xl p-6"
      style={{ background: '#FFF8F0', border: '1px solid rgba(232,180,184,0.3)', boxShadow: '0 4px 24px rgba(196,149,106,0.1)' }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl text-[#2C1A0E] mb-1"
            style={{ fontFamily: 'Yatra One, cursive' }}
          >
            My Cycle Tracker
          </h2>
          <p className="text-xs" style={{ color: '#C4956A' }}>
            Day {selectedDay} · {config.label} phase
          </p>
        </div>
        <span className="text-xs px-3 py-1.5 rounded-full font-medium text-[#2C1A0E]"
          style={{ background: config.bg }}
        >
          {config.label}
        </span>
      </div>

      {/* Phase legend */}
      <div className="flex gap-2 flex-wrap mb-5">
        {Object.entries(PHASE_CONFIG).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: val.bg }}/>
            <span className="text-xs" style={{ color: '#C4956A' }}>{val.label}</span>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map((d) => (
          <div key={d} className="text-center text-xs py-1" style={{ color: '#C4956A' }}>
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        <div />
        {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
          const phase = getPhase(day)
          const bg = PHASE_CONFIG[phase].bg
          const isToday = day === TODAY
          const isSelected = day === selectedDay

          return (
            <button key={day}
              onClick={() => {
                setSelectedDay(day)
                updateCycleFromDay(day)
              }}
              className="aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 hover:scale-105 text-[#2C1A0E]"
              style={{
                background: isToday ? '#5C1F1F' : bg,
                color: isToday ? 'white' : '#2C1A0E',
                transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                boxShadow: isSelected ? '0 0 0 2px #2C1A0E' : 'none',
              }}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Phase cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {Object.entries(PHASE_CONFIG).map(([key, val]) => (
          <div key={key} className="rounded-xl p-3 text-center"
            style={{ background: 'rgba(255,255,255,0.6)', border: `1px solid ${val.bg}60` }}
          >
            <div className="text-2xl mb-1">{val.icon}</div>
            <div className="text-xs mb-0.5 font-medium text-[#2C1A0E]">{val.label}</div>
            <div className="text-xs" style={{ color: '#C4956A' }}>
              {key === 'menstrual'  ? 'Day 1-5'   : ''}
              {key === 'follicular' ? 'Day 6-12'  : ''}
              {key === 'ovulation'  ? 'Day 13-16' : ''}
              {key === 'luteal'     ? 'Day 17-28' : ''}
            </div>
          </div>
        ))}
      </div>

      {/* Selected day info */}
      <div className="rounded-xl p-4"
        style={{ background: `${config.bg}30`, border: `1px solid ${config.bg}60` }}
      >
        <p className="text-sm text-[#2C1A0E]">
          <strong>Day {selectedDay} — {config.label}:</strong> {config.desc}
        </p>
      </div>
    </div>
  )
}