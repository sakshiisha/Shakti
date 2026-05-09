'use client'

import { useEffect, useState } from 'react'
import api          from '@/lib/axios'
import WellnessHero  from '@/components/sakhi/WellnessHero'
import PeriodTracker from '@/components/sakhi/PeriodTracker'
import MoodCheckin   from '@/components/sakhi/MoodCheckin'
import AyurvedicTips from '@/components/sakhi/AyurvedicTips'
import PeerShare     from '@/components/sakhi/PeerShare'

export default function SakhiPage() {
  const [periodData, setPeriodData] = useState(null)
  const [todayMood,  setTodayMood]  = useState(null)
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [periodRes, moodRes] = await Promise.all([
          api.get('/period'),
          api.get('/mood/today'),
        ])
        setPeriodData(periodRes.data.data)
        setTodayMood(moodRes.data.todayMood)
      } catch (err) {
        console.error('Sakhi data fetch failed:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#FFF8F0' }}>
      <div className="max-w-7xl mx-auto px-6 py-10">

        <WellnessHero periodData={periodData} />

        {loading ? (
          <div className="text-center py-20" style={{ color: '#C4956A' }}>
            <div className="text-4xl mb-3">🌸</div>
            <p>Loading your wellness data...</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <PeriodTracker
                periodData={periodData}
                setPeriodData={setPeriodData}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <MoodCheckin
                todayMood={todayMood}
                setTodayMood={setTodayMood}
              />
              <AyurvedicTips phase={periodData?.currentPhase} />
            </div>
            <PeerShare />
          </>
        )}

      </div>
    </div>
  )
}