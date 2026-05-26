'use client'

import { useEffect, useRef } from 'react'

const ZONE_COLORS = {
  safe:    { color: '#2D6A4F', fillColor: '#2D6A4F' },
  caution: { color: '#C4956A', fillColor: '#C4956A' },
  unsafe:  { color: '#E24B4A', fillColor: '#E24B4A' },
}

export default function LeafletMap({ zoneStatus = 'safe', location = null }) {
  const mapRef      = useRef(null)
  const instanceRef = useRef(null)
  const circleRef   = useRef(null)
  const markerRef   = useRef(null)

  const center = location || { lat: 28.6139, lng: 77.2090 }

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return

    const init = async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')
      if (instanceRef.current) return

      const map = L.map(mapRef.current, {
        center:             [center.lat, center.lng],
        zoom:               15,
        zoomControl:        true,
        attributionControl: false,
        scrollWheelZoom:    false, // scroll fix
      })

      // z-index fix — navbar ke neeche rahe
      map.getContainer().style.zIndex = '1'

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map)

      const icon = L.divIcon({
        html: `<div style="width:16px;height:16px;border-radius:50%;background:#F4A7B9;border:3px solid white;box-shadow:0 0 10px rgba(244,167,185,0.7)"></div>`,
        className: '', iconSize: [16, 16], iconAnchor: [8, 8],
      })

      markerRef.current = L.marker([center.lat, center.lng], { icon }).addTo(map)

      const zc = ZONE_COLORS[zoneStatus] || ZONE_COLORS.safe
      circleRef.current = L.circle([center.lat, center.lng], {
        radius: 300, color: zc.color, fillColor: zc.fillColor,
        fillOpacity: 0.12, weight: 2,
      }).addTo(map)

      instanceRef.current = map
    }

    init()
    return () => {
      instanceRef.current?.remove()
      instanceRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!instanceRef.current || !location) return
    instanceRef.current.panTo([location.lat, location.lng])
    markerRef.current?.setLatLng([location.lat, location.lng])
    if (circleRef.current) {
      circleRef.current.setLatLng([location.lat, location.lng])
      const zc = ZONE_COLORS[zoneStatus] || ZONE_COLORS.safe
      circleRef.current.setStyle({ color: zc.color, fillColor: zc.fillColor })
    }
  }, [location, zoneStatus])

  return <div ref={mapRef} style={{ width: '100%', height: '260px' }} />
}