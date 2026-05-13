'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/axios'
import WellnessHero  from '@/components/sakhi/WellnessHero'
import PeriodTracker from '@/components/sakhi/PeriodTracker'
import MoodCheckin   from '@/components/sakhi/MoodCheckin'
import AyurvedicTips from '@/components/sakhi/AyurvedicTips'

export default function SakhiPage() {
  const [periodData, setPeriodData] = useState(null)
  const [todayMood,  setTodayMood]  = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [activeTab,  setActiveTab]  = useState('period')

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [p, m] = await Promise.all([
          api.get('/period'),
          api.get('/mood/today'),
        ])
        setPeriodData(p.data.data)
        setTodayMood(m.data.todayMood)
      } catch (err) {
        console.error('Sakhi fetch failed:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const tabs = [
    { id: 'period',   label: 'Period'   },
    { id: 'mood',     label: 'Mood'     },
    { id: 'remedies', label: 'Remedies' },
    { id: 'peers',    label: 'Peer Share' }, // 👈 ADD THIS
  ]

  return (
    <div className="min-h-screen" style={{ background: '#FFF8F0' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        <WellnessHero periodData={periodData} />

        {/* Simple tabs */}
        <div className="flex gap-2 mb-6 p-1 rounded-2xl"
          style={{ background: 'rgba(232,180,184,0.15)' }}
        >
          {tabs.map((tab) => (
            <button key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: activeTab === tab.id ? 'white' : 'transparent',
                color: activeTab === tab.id ? '#2C1A0E' : '#C4956A',
                boxShadow: activeTab === tab.id ? '0 2px 8px rgba(196,149,106,0.15)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16" style={{ color: '#C4956A' }}>
            <div className="text-4xl mb-3">🌸</div>
            <p>Loading your wellness data...</p>
          </div>
        ) : (
          <>
  {activeTab === 'period'   && <PeriodTracker periodData={periodData} setPeriodData={setPeriodData} />}
  {activeTab === 'mood'     && <MoodCheckin todayMood={todayMood} setTodayMood={setTodayMood} />}
  {activeTab === 'remedies' && <AyurvedicTips phase={periodData?.currentPhase} />}
</>
        )}

      </div>
    </div>
  )
}