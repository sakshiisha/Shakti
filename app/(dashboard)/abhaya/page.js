'use client'

import { useEffect, useState } from 'react'
import useLocation         from '@/hooks/useLocation'
import { getNearbyPlaces } from '@/lib/placesUtils'
import SafetyMap           from '@/components/abhaya/SafetyMap'
import EmergencyButton     from '@/components/abhaya/EmergencyButton'
import CommunityFeed       from '@/components/abhaya/CommunityFeed'
import ZoneLegend          from '@/components/abhaya/ZoneLegend'

export default function AbhayaPage() {
  const { location, zoneData } = useLocation()

  const [resources, setResources] = useState([
    { icon: '🏥', label: 'Hospital', dist: '...' },
    { icon: '🚔', label: 'Police Station', dist: '...' },
    { icon: '💊', label: 'Pharmacy', dist: '...' },
  ])
  const [resourcesLoading, setResourcesLoading] = useState(false)

  const zoneStatus = zoneData?.status || 'safe'

  useEffect(() => {
    if (!location) return

    const fetchPlaces = async () => {
      setResourcesLoading(true)
      const places = await getNearbyPlaces(location.lat, location.lng)
      setResources(places)
      setResourcesLoading(false)
    }

    fetchPlaces()
  }, [location])

  return (
    <div className="min-h-screen" style={{ background: '#FFF8F0' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.3)' }}>
            <span>🛡</span>
            <span className="text-xs font-medium" style={{ color: '#C4956A' }}>
              Abhaya — Safety Platform
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl"
            style={{ fontFamily: 'Yatra One, cursive', color: '#2C1A0E' }}
          >
            Stay aware. Stay protected.
          </h1>
        </div>

        {/* DASHBOARD GRID */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* ⭐ FIX — map full width escape */}
            <div className="-mx-4 sm:-mx-6 lg:-mx-8">
              <SafetyMap zoneStatus={zoneStatus} location={location} />
            </div>

            <CommunityFeed location={location} />
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            <EmergencyButton location={location} />
            <ZoneLegend currentStatus={zoneStatus} />

            <div className="rounded-2xl p-4"
              style={{ background: 'white', border: '1px solid rgba(196,149,106,0.2)' }}>
              <p className="text-xs font-medium uppercase tracking-wider mb-3"
                style={{ color: '#C4956A' }}>
                Nearby Help
              </p>

              {resourcesLoading ? (
                <p className="text-sm" style={{ color: '#C4956A' }}>
                  Finding nearby places...
                </p>
              ) : (
                <div className="space-y-3">
                  {resources.map((r, i) => (
                    <div key={i}
                      className="flex items-center justify-between p-3 rounded-xl"
                      style={{ background: 'rgba(196,149,106,0.08)' }}>
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{r.icon}</span>
                        <span className="text-sm text-[#2C1A0E]">{r.label}</span>
                      </div>
                      <span className="text-xs" style={{ color: '#C4956A' }}>
                        {r.dist}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}