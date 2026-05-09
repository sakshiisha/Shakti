'use client'

export default function FallingPetals() {
  const petals = [
    { id: 1,  left: 5,  delay: 0,   duration: 8,  color: '#F97316' },
    { id: 2,  left: 15, delay: 2,   duration: 10, color: '#FF9A6C' },
    { id: 3,  left: 25, delay: 5,   duration: 7,  color: '#F97316' },
    { id: 4,  left: 35, delay: 1,   duration: 11, color: '#FF9A6C' },
    { id: 5,  left: 45, delay: 3,   duration: 9,  color: '#F97316' },
    { id: 6,  left: 55, delay: 7,   duration: 8,  color: '#FF9A6C' },
    { id: 7,  left: 65, delay: 4,   duration: 12, color: '#F97316' },
    { id: 8,  left: 75, delay: 6,   duration: 7,  color: '#FF9A6C' },
    { id: 9,  left: 85, delay: 2,   duration: 10, color: '#F97316' },
    { id: 10, left: 92, delay: 8,   duration: 9,  color: '#FF9A6C' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute w-3 h-4 rounded-full opacity-70"
          style={{
            left: `${petal.left}%`,
            top: '-20px',
            backgroundColor: petal.color,
            animation: `fall ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  )
}