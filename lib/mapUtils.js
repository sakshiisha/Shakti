// Distance calculate karo — meters mein
export const getDistance = (lat1, lng1, lat2, lng2) => {
  const R    = 6371000 // Earth radius meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Zone status se color
export const getZoneColor = (status) => {
  const colors = {
    safe:    { bg: '#2D6A4F', light: 'rgba(45,106,79,0.15)',  text: '#27500A' },
    caution: { bg: '#C4956A', light: 'rgba(196,149,106,0.15)', text: '#633806' },
    unsafe:  { bg: '#7C1D1D', light: 'rgba(124,29,29,0.15)',  text: '#791F1F' },
  }
  return colors[status] || colors.safe
}

// Zone status se label
export const getZoneLabel = (status) => {
  const labels = {
    safe:    'Safe Zone ✓',
    caution: 'Caution Zone ⚠',
    unsafe:  'Unsafe Zone ✕',
  }
  return labels[status] || 'Checking...'
}

// Crowd count se safety level
export const getCrowdSafetyLevel = (count) => {
  if (count === 0)              return { status: 'unsafe',  label: 'Empty area'     }
  if (count >= 1 && count <= 2) return { status: 'unsafe',  label: 'Very few people' }
  if (count >= 3 && count <= 5) return { status: 'caution', label: 'Few people'      }
  if (count >= 6 && count <= 9) return { status: 'caution', label: 'Some people'     }
  return                               { status: 'safe',    label: '10+ people'      }
}

// Current period phase
export const getPeriodPhase = (day) => {
  if (day <= 5)  return 'menstrual'
  if (day <= 13) return 'follicular'
  if (day <= 16) return 'ovulation'
  return 'luteal'
}

// Next period date
export const getNextPeriodDate = (lastPeriodStart, cycleLength) => {
  if (!lastPeriodStart) return null
  const next = new Date(lastPeriodStart)
  next.setDate(next.getDate() + cycleLength)
  return next
}

// Days to next period
export const getDaysToNextPeriod = (nextPeriodDate) => {
  if (!nextPeriodDate) return null
  const diff = new Date(nextPeriodDate) - new Date()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

// Format date for display
export const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}