'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import api from '@/lib/axios'

// Leaflet map SSR off
const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false })

export default function SafetyMap() {
  const [location, setLocation] = useState(null)
  const [zoneStatus, setZoneStatus] = useState('safe')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false)
      return
    }

    let currentCoords = null

    const fetchZone = async (coords) => {
      try {
        const res = await api.post('/safety/check-zone', coords)

        if (res.data?.zone?.status) {
          setZoneStatus(res.data.zone.status)
        }
      } catch (err) {
        console.error('Zone check failed', err)
      }
    }

    // 📍 initial GPS fetch
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        currentCoords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }

        setLocation(currentCoords)

        await fetchZone(currentCoords)
        setLoading(false)
      },
      () => setLoading(false),
      { enableHighAccuracy: true }
    )

    // 🔥 LIVE ZONE UPDATES (every 15 sec)
    const zoneInterval = setInterval(() => {
      if (!currentCoords) return
      fetchZone(currentCoords)
    }, 15000)

    return () => {
      clearInterval(zoneInterval)
    }
  }, [])

  if (loading) {
    return (
      <div className="rounded-2xl p-6 text-center text-sm text-[#C4956A]">
        Detecting your location...
      </div>
    )
  }

  return (
    <div
      className="mb-4 relative rounded-2xl overflow-hidden"
      style={{ height: '300px' }}
    >
      <LeafletMap zoneStatus={zoneStatus} location={location} />

      {/* Zone badge */}
      <div
        className="absolute top-3 right-3 z-50 px-3 py-1.5 rounded-full text-xs font-medium text-white"
        style={{
          background:
            zoneStatus === 'safe'
              ? '#2D6A4F'
              : zoneStatus === 'unsafe'
              ? '#E24B4A'
              : '#C4956A',
        }}
      >
        {zoneStatus === 'safe' && 'Safe Zone ✓'}
        {zoneStatus === 'caution' && 'Caution Zone ⚠'}
        {zoneStatus === 'unsafe' && 'Unsafe Zone ✕'}
      </div>

      {location && (
        <div
          className="absolute bottom-3 left-3 z-50 text-xs px-2 py-1 rounded-lg"
          style={{ background: 'rgba(255,248,240,0.95)', color: '#C4956A' }}
        >
          📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </div>
      )}
    </div>
  )
}