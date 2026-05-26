'use client'

import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false })

export default function SafetyMap({ zoneStatus = 'safe', location = null }) {
  const badgeConfig = {
    safe:    { bg: '#2D6A4F', text: 'Safe Zone ✓'    },
    caution: { bg: '#C4956A', text: 'Caution Zone ⚠'  },
    unsafe:  { bg: '#E24B4A', text: 'Unsafe Zone ✕'   },
  }
  const badge = badgeConfig[zoneStatus] || badgeConfig.safe

  return (
    <div style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', height: '260px', border: '1px solid rgba(196,149,106,0.25)' }}>
      <LeafletMap zoneStatus={zoneStatus} location={location} />
      <div style={{
        position: 'absolute', top: '12px', right: '12px', zIndex: 999,
        padding: '5px 12px', borderRadius: '20px',
        background: badge.bg, color: 'white', fontSize: '12px', fontWeight: 500,
      }}>
        {badge.text}
      </div>
      {location && (
        <div style={{
          position: 'absolute', bottom: '12px', left: '12px', zIndex: 999,
          padding: '4px 10px', borderRadius: '8px', fontSize: '11px',
          background: 'rgba(255,248,240,0.92)', color: '#C4956A',
        }}>
          📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </div>
      )}
    </div>
  )
}