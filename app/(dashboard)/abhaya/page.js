'use client'

import { useState, useEffect } from 'react'
import useAuthStore   from '@/store/authStore'
import api            from '@/lib/axios'
import SafetyMap      from '@/components/abhaya/SafetyMap'
import EmergencyButton from '@/components/abhaya/EmergencyButton'
import ZoneLegend     from '@/components/abhaya/ZoneLegend'
import HelpButton     from '@/components/abhaya/HelpButton'
import NearbyResources from '@/components/abhaya/NearbyResources'
import { getNearbyPlaces } from '@/lib/placesUtils'

export default function AbhayaPage() {
  const { user }                          = useAuthStore()
  const [location,   setLocation]         = useState(null)
  const [zoneStatus, setZoneStatus]       = useState('safe')
  const [zoneReason, setZoneReason]       = useState('')
  const [resources,  setResources]        = useState([
    { icon: '🏥', label: 'Hospital',     dist: '...' },
    { icon: '🚔', label: 'Police — 112', dist: 'Call' },
    { icon: '💊', label: 'Pharmacy',     dist: '...' },
  ])

  useEffect(() => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lng } }) => {
        setLocation({ lat, lng })

        // Zone check
        try {
          const { data } = await api.post('/safety/check-zone', { lat, lng })
          setZoneStatus(data.zone?.status || 'safe')
          setZoneReason(data.zone?.reason  || '')
        } catch {
          setZoneStatus('safe')
        }

        // Nearby places
        const places = await getNearbyPlaces(lat, lng)
        if (places?.length > 0) setResources(places)
      },
      () => setZoneStatus('safe'),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [])

  return (
    <div style={{ background: '#FFF8F0', minHeight: '100vh' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '24px 16px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 14px', borderRadius: '20px', marginBottom: '12px',
            background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.3)',
          }}>
            <span style={{ fontSize: '13px' }}>🛡</span>
            <span style={{ fontSize: '12px', color: '#C4956A', fontWeight: 500 }}>
              Abhaya — Safety Dashboard
            </span>
          </div>
          <h1 style={{
            fontFamily: 'Yatra One, cursive',
            fontSize:   'clamp(22px, 5vw, 32px)',
            color:      '#2C1A0E',
            margin:     '0 0 4px',
          }}>
            Stay Safe, Stay Protected
          </h1>
          <p style={{ fontSize: '13px', color: '#C4956A', margin: 0 }}>
            Hello {user?.fullName?.split(' ')[0] || 'Priya'} 🌸
          </p>
        </div>

        {/* Zone Banner */}
        <ZoneBanner status={zoneStatus} reason={zoneReason} location={location} />

        {/* Map */}
        <div style={{ marginBottom: '20px' }}>
          <SafetyMap zoneStatus={zoneStatus} location={location} />
        </div>

        {/* Zone Legend */}
        <div style={{ marginBottom: '20px' }}>
          <ZoneLegend currentStatus={zoneStatus} />
        </div>

        {/* SOS */}
        <div style={{ marginBottom: '20px' }}>
          <EmergencyButton location={location} />
        </div>

        {/* Help Message */}
        <div style={{ marginBottom: '20px' }}>
          <HelpButton location={location} />
        </div>

        {/* Nearby Resources */}
        <NearbyResources resources={resources} />

      </div>
    </div>
  )
}

// Zone Banner — inline small component
function ZoneBanner({ status, reason, location }) {
  const config = {
    safe:    { color: '#2D6A4F', bg: 'rgba(45,106,79,0.08)',  label: 'Safe Zone',    emoji: '🟢', msg: 'You are in a safe area' },
    caution: { color: '#C4956A', bg: 'rgba(196,149,106,0.1)', label: 'Caution Zone', emoji: '🟡', msg: 'Stay alert in this area' },
    unsafe:  { color: '#7C1D1D', bg: 'rgba(124,29,29,0.08)',  label: 'Unsafe Zone',  emoji: '🔴', msg: 'Be careful — unsafe area' },
  }
  const z = config[status] || config.safe

  return (
    <div style={{
      borderRadius: '14px', padding: '14px 18px', marginBottom: '20px',
      background: z.bg, border: `1.5px solid ${z.color}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '8px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '28px' }}>{z.emoji}</span>
        <div>
          <p style={{ fontSize: '15px', fontWeight: 600, color: z.color, margin: '0 0 2px' }}>
            {z.label}
          </p>
          <p style={{ fontSize: '12px', color: z.color, opacity: 0.8, margin: 0 }}>
            {reason || z.msg}
          </p>
        </div>
      </div>
      {location && (
        <span style={{ fontSize: '11px', color: z.color, opacity: 0.6 }}>
          📍 {location.lat.toFixed(3)}, {location.lng.toFixed(3)}
        </span>
      )}
    </div>
  )
}