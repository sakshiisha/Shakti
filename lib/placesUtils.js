// Bilkul free — koi API key nahi
export const getNearbyPlaces = async (lat, lng) => {
  const radius = 2000 // 2km

  const query = `
    [out:json][timeout:10];
    (
      node["amenity"="hospital"](around:${radius},${lat},${lng});
      node["amenity"="police"](around:${radius},${lat},${lng});
      node["amenity"="pharmacy"](around:${radius},${lat},${lng});
      node["amenity"="clinic"](around:${radius},${lat},${lng});
    );
    out body;
  `

  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body:   query,
    })

    const data = await res.json()

    const typeMap = {
      hospital: { icon: '🏥', label: 'Hospital'       },
      police:   { icon: '🚔', label: 'Police Station'  },
      pharmacy: { icon: '💊', label: 'Pharmacy'        },
      clinic:   { icon: '🏥', label: 'Clinic'          },
    }

    // Har type ka nearest dhundo
    const nearest = {}

    for (const element of data.elements || []) {
      const amenity = element.tags?.amenity
      if (!typeMap[amenity]) continue

      const dist = getDistance(lat, lng, element.lat, element.lon)

      if (!nearest[amenity] || dist < nearest[amenity].distNum) {
        nearest[amenity] = {
          icon:    typeMap[amenity].icon,
          label:   element.tags?.name || typeMap[amenity].label,
          dist:    dist < 1000
            ? `${Math.round(dist)}m`
            : `${(dist / 1000).toFixed(1)}km`,
          distNum: dist,
        }
      }
    }

    const results = Object.values(nearest)
      .sort((a, b) => a.distNum - b.distNum)
      .slice(0, 3)

    // Agar koi nahi mila
    if (results.length === 0) {
      return [
        { icon: '🏥', label: 'Hospital',       dist: 'Searching...' },
        { icon: '🚔', label: 'Police Station', dist: 'Searching...' },
        { icon: '💊', label: 'Pharmacy',       dist: 'Searching...' },
      ]
    }

    return results

  } catch (err) {
    console.error('Places fetch failed:', err)
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
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2
  return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}