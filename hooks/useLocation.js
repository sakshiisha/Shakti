'use client'
import { useState, useEffect, useRef } from 'react'
import api from '@/lib/axios'
import useSafetyStore from '@/store/safetyStore'

// distance between two coords (meters)
const getDistance = (a, b) => {
  const R = 6371e3
  const toRad = d => d * Math.PI / 180

  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)

  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)

  const x =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLng/2) * Math.sin(dLng/2)

  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x))
}

export default function useLocation() {
  // ❌ local location/zone state REMOVE
  // const [location, setLocation] = useState(null)
  // const [zoneData, setZoneData] = useState(null)

  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  // ✅ GLOBAL STORE CONNECT
  const location = useSafetyStore(state => state.currentLocation)
  const zoneData   = useSafetyStore(state => state.zoneData)
  const setLocation = useSafetyStore(state => state.setLocation)
  const setZoneData = useSafetyStore(state => state.setZoneData)

  const lastCheckedLocation = useRef(null)
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true

    if (!navigator.geolocation) {
      setError('GPS not supported')
      setLoading(false)
      return
    }

    const checkZone = async (lat, lng) => {
      try {
        const { data } = await api.post('/safety/check-zone', { lat, lng })
        setZoneData(data.zone) // 🔥 now global update
      } catch (err) {
        console.error('Zone check failed:', err)
      }
    }

    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const newLoc = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }

          setLocation(newLoc) // 🔥 global update
          setLoading(false)

          // first run → always check
          if (!lastCheckedLocation.current) {
            lastCheckedLocation.current = newLoc
            return checkZone(newLoc.lat, newLoc.lng)
          }

          // check movement distance
          const distance = getDistance(lastCheckedLocation.current, newLoc)

          if (distance > 100) { // moved >100m
            lastCheckedLocation.current = newLoc
            checkZone(newLoc.lat, newLoc.lng)
          }
        },
        () => {
          setError('Location denied')
          setLoading(false)

          // fallback → Delhi
          const fallback = { lat: 28.6139, lng: 77.2090 }
          setLocation(fallback)
          checkZone(fallback.lat, fallback.lng)
        },
        { enableHighAccuracy: true, timeout: 8000 }
      )
    }

    // initial fetch
    fetchLocation()

    // poll every 60 seconds (NOT watchPosition)
    const interval = setInterval(fetchLocation, 60000)

    return () => clearInterval(interval)
  }, [])

  // return global state
  return { location, zoneData, loading, error }
}