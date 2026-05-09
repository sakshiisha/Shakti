'use client'

import { useEffect, useState } from 'react'
import useLocation          from '@/hooks/useLocation'
import { getNearbyPlaces }  from '@/lib/placesUtils'
import SafetyMap            from '@/components/abhaya/SafetyMap'
import EmergencyButton      from '@/components/abhaya/EmergencyButton'
import CommunityFeed        from '@/components/abhaya/CommunityFeed'
import ZoneLegend           from '@/components/abhaya/ZoneLegend'

export default function AbhayaPage() {
  const { location, zoneData, loading, error } = useLocation()

  const [resources, setResources] = useState([
    { icon: '🏥', label: 'Hospital',       dist: '...' },
    { icon: '🚔', label: 'Police Station', dist: '...' },
    { icon: '💊', label: 'Pharmacy',       dist: '...' },
  ])
  const [resourcesLoading, setResourcesLoading] = useState(false)

  const zoneStatus = zoneData?.status || 'safe'
  const zoneColor  = {
    safe:    '#2D6A4F',
    caution: '#C4956A',
    unsafe:  '#E24B4A',
  }

  // Real resources fetch karo jab location mile
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
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.3)' }}
          >
            <span>🛡</span>
            <span className="text-xs font-medium" style={{ color: '#C4956A' }}>
              Abhaya — Safety Platform
            </span>
          </div>
          <h1 className="text-5xl text-[#2C1A0E] mb-2"
            style={{ fontFamily: 'Yatra One, cursive' }}
          >
            Your Safety Dashboard
          </h1>
          <p style={{ color: '#C4956A' }}>
            Real-time protection · Stay safe, stay connected
          </p>
        </div>

        {/* GPS error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm"
            style={{ background: '#FAEEDA', border: '1px solid #EF9F27', color: '#633806' }}
          >
            ⚠️ {error} — Please allow location access for accurate results.
          </div>
        )}

        {/* Zone alert */}
        {!loading && zoneStatus !== 'safe' && (
          <div className="mb-6 px-5 py-4 rounded-2xl flex items-center gap-3"
            style={{
              background: zoneStatus === 'unsafe' ? '#FCEBEB' : '#FAEEDA',
              border: `1px solid ${zoneStatus === 'unsafe' ? '#F09595' : '#EF9F27'}`,
            }}
          >
            <span className="text-2xl">
              {zoneStatus === 'unsafe' ? '⚠️' : '🟡'}
            </span>
            <div>
              <p className="font-medium text-sm"
                style={{ color: zoneStatus === 'unsafe' ? '#791F1F' : '#633806' }}
              >
                {zoneStatus === 'unsafe'
                  ? 'You are in an unsafe zone — be careful!'
                  : 'Caution zone — stay alert'}
              </p>
              <p className="text-xs mt-0.5"
                style={{ color: zoneStatus === 'unsafe' ? '#A32D2D' : '#854F0B' }}
              >
                {zoneData?.reason || ''}
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              num:   loading ? '...' : zoneStatus.charAt(0).toUpperCase() + zoneStatus.slice(1),
              label: 'Current Zone',
              icon:  zoneStatus === 'safe' ? '🟢' : zoneStatus === 'unsafe' ? '🔴' : '🟡',
              color: zoneColor[zoneStatus] || '#D4A017',
            },
            {
              num:   loading ? '...' : zoneData?.crowdCount ?? 0,
              label: 'Nearby Sisters',
              icon:  '👥',
              color: '#D4A017',
            },
            {
              num:   resourcesLoading
                ? '...'
                : resources.find(r => r.label.toLowerCase().includes('police'))?.dist || 'N/A',
              label: 'Nearest Police',
              icon:  '🚔',
              color: '#D4A017',
            },
            {
              num:   loading ? '...' : zoneData?.distressReports ?? 0,
              label: 'Distress Reports',
              icon:  '📢',
              color: '#D4A017',
            },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-4 text-center"
              style={{ background: '#5C1F1F', border: '1px solid rgba(245,200,66,0.2)' }}
            >
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="text-xl font-medium mb-1"
                style={{ color: s.color, fontFamily: 'Yatra One, cursive' }}
              >
                {s.num}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255,248,240,0.7)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Map + SOS */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <SafetyMap zoneStatus={zoneStatus} location={location} />
            <ZoneLegend currentStatus={zoneStatus} />
          </div>
          <div className="flex flex-col gap-4">
            <EmergencyButton location={location} />

            {/* Real Resources */}
            <div className="rounded-2xl p-5"
              style={{ background: 'white', borderLeft: '4px solid #2D6A4F' }}
            >
              <p className="text-sm font-medium mb-3" style={{ color: '#27500A' }}>
                Nearest Resources
              </p>
              {resources.map((r, i) => (
                <div key={i}
                  className="flex justify-between items-center py-2"
                  style={{ borderBottom: '0.5px solid rgba(196,149,106,0.2)' }}
                >
                  <span className="text-sm text-[#2C1A0E]">
                    {r.icon} {r.label}
                  </span>
                  <span className="text-xs font-medium"
                    style={{ color: resourcesLoading ? '#C4956A' : '#2D6A4F' }}
                  >
                    {r.dist}
                  </span>
                </div>
              ))}
              {!loading && location && (
                <p className="text-xs mt-2" style={{ color: 'rgba(196,149,106,0.6)' }}>
                  📍 Based on your current location
                </p>
              )}
            </div>
          </div>
        </div>

        <CommunityFeed location={location} />
      </div>
    </div>
  )
}