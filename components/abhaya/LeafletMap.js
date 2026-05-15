'use client'

import { useEffect, useRef } from 'react'

const ZONE_COLORS = {
  safe:    { color: '#2D6A4F', fillColor: '#2D6A4F' },
  caution: { color: '#C4956A', fillColor: '#C4956A' },
  unsafe:  { color: '#E24B4A', fillColor: '#E24B4A' },
}

const DEFAULT_LOCATION = { lat: 28.6139, lng: 77.2090 }

export default function LeafletMap({ zoneStatus = 'safe', location = null }) {
  const mapRef      = useRef(null)
  const instanceRef = useRef(null)
  const circleRef   = useRef(null)
  const markerRef   = useRef(null)

  const center = location || DEFAULT_LOCATION

  useEffect(() => {
    if (typeof window === 'undefined') return

    const initMap = async () => {
      if (!mapRef.current) return  // ✅ FIX

      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      if (instanceRef.current) return

      const map = L.map(mapRef.current, {
        center:             [center.lat, center.lng],
        zoom:               15,
        zoomControl:        true,
        attributionControl: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom:     19,
      }).addTo(map)

      const icon = L.divIcon({
        html: `<div style="
          width:18px; height:18px; border-radius:50%;
          background:#F4A7B9; border:3px solid white;
          box-shadow:0 0 10px rgba(244,167,185,0.6);
        "></div>`,
        className: '',
        iconSize:   [18, 18],
        iconAnchor: [9, 9],
      })

      const marker = L.marker([center.lat, center.lng], { icon }).addTo(map)
      markerRef.current = marker

      const zoneColor = ZONE_COLORS[zoneStatus] || ZONE_COLORS.safe
      const circle = L.circle([center.lat, center.lng], {
        radius:      300,
        color:       zoneColor.color,
        fillColor:   zoneColor.fillColor,
        fillOpacity: 0.15,
        weight:      2,
      }).addTo(map)
      circleRef.current = circle

      L.circle([center.lat, center.lng], {
        radius:      600,
        color:       '#C4956A',
        fillColor:   'transparent',
        fillOpacity: 0,
        weight:      1.5,
        dashArray:   '5 5',
      }).addTo(map)

      instanceRef.current = map
    }

    initMap()

    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove()
        instanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!instanceRef.current || !location) return

    instanceRef.current.panTo([location.lat, location.lng])

    if (markerRef.current) {
      markerRef.current.setLatLng([location.lat, location.lng])
    }

    if (circleRef.current) {
      circleRef.current.setLatLng([location.lat, location.lng])
      const zoneColor = ZONE_COLORS[zoneStatus] || ZONE_COLORS.safe
      circleRef.current.setStyle({
        color:     zoneColor.color,
        fillColor: zoneColor.fillColor,
      })
    }
  }, [location, zoneStatus])

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '300px', borderRadius: '16px' }}
    />
  )
}