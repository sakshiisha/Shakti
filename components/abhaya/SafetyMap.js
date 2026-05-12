'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import — SSR disable karo Leaflet ke liye
const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false })

export default function SafetyMap({ zoneStatus = 'safe', location = null }) {
  return (
    <div className="mb-4 relative rounded-2xl overflow-hidden"
      style={{ height: '300px' }}
    >
      <LeafletMap zoneStatus={zoneStatus} location={location} />

      {/* Zone badge */}
      <div className="absolute top-3 right-3 z-50 px-3 py-1.5 rounded-full text-xs font-medium text-white"
        style={{
          background: zoneStatus === 'safe'
            ? '#2D6A4F' : zoneStatus === 'unsafe'
            ? '#E24B4A' : '#C4956A',
        }}
      >
        {zoneStatus === 'safe'    && 'Safe Zone ✓'}
        {zoneStatus === 'caution' && 'Caution Zone ⚠'}
        {zoneStatus === 'unsafe'  && 'Unsafe Zone ✕'}
      </div>

      {location && (
        <div className="absolute bottom-3 left-3 z-50 text-xs px-2 py-1 rounded-lg"
          style={{ background: 'rgba(255,248,240,0.95)', color: '#C4956A' }}
        >
          📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </div>
      )}
    </div>
  )
}