import api from '@/lib/axios'

export const getNearbyPlaces = async (lat, lng) => {
  try {
    const { data } = await api.get('/places/nearby', {
      params: { lat, lng, radius: 2000 },
    })

    const typeMap = {
      hospital: { icon: '🏥', label: 'Hospital'      },
      police:   { icon: '🚔', label: 'Police Station' },
      pharmacy: { icon: '💊', label: 'Pharmacy'       },
      clinic:   { icon: '🏥', label: 'Clinic'         },
    }

    const nearest = {}

    for (const el of data.elements || []) {
      const amenity = el.tags?.amenity
      if (!typeMap[amenity]) continue
      const dist = getDistance(lat, lng, el.lat, el.lon)
      if (!nearest[amenity] || dist < nearest[amenity].distNum) {
        nearest[amenity] = {
          icon:    typeMap[amenity].icon,
          label:   el.tags?.name || typeMap[amenity].label,
          address: el.tags?.['addr:street'] || '',
          dist:    dist < 1000 ? `${Math.round(dist)}m` : `${(dist/1000).toFixed(1)}km`,
          distNum: dist,
          lat:     el.lat,   // navigate ke liye
          lng:     el.lon,
        }
      }
    }

    const results = Object.values(nearest).sort((a, b) => a.distNum - b.distNum).slice(0, 3)

    return results.length > 0 ? results : [
      { icon: '🏥', label: 'Hospital',       dist: 'Not found' },
      { icon: '🚔', label: 'Police Station', dist: 'Not found' },
      { icon: '💊', label: 'Pharmacy',       dist: 'Not found' },
    ]
  } catch {
    return [
      { icon: '🏥', label: 'Hospital',       dist: 'Unavailable' },
      { icon: '🚔', label: 'Police Station', dist: 'Unavailable' },
      { icon: '💊', label: 'Pharmacy',       dist: 'Unavailable' },
    ]
  }
}

const getDistance = (lat1, lng1, lat2, lng2) => {
  const R    = 6371000
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a    =
    Math.sin(dLat/2)**2 +
    Math.cos((lat1*Math.PI)/180) * Math.cos((lat2*Math.PI)/180) * Math.sin(dLng/2)**2
  return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}