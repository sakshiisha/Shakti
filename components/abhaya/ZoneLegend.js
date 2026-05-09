export default function ZoneLegend({ currentStatus = 'safe' }) {
  const zones = [
    { status: 'safe',    color: '#2D6A4F', bg: 'rgba(45,106,79,0.1)',   label: 'Safe Zone',    desc: 'Safe to travel'    },
    { status: 'caution', color: '#C4956A', bg: 'rgba(196,149,106,0.1)', label: 'Caution Zone', desc: 'Stay alert'        },
    { status: 'unsafe',  color: '#5C1F1F', bg: 'rgba(92,31,31,0.1)',    label: 'Unsafe Zone',  desc: 'Avoid if possible' },
  ]

  return (
    <div className="rounded-xl p-4"
      style={{ background: 'white', border: '1px solid rgba(196,149,106,0.2)' }}
    >
      <p className="text-xs font-medium uppercase tracking-wider mb-3"
        style={{ color: '#C4956A' }}
      >
        Zone Legend
      </p>

      <div className="flex flex-col gap-2">
        {zones.map((z) => (
          <div key={z.status}
            className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200"
            style={{
              background: z.bg,
              border: currentStatus === z.status
                ? `1.5px solid ${z.color}`
                : '1.5px solid transparent',
            }}
          >
            <div className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ background: z.color }}
            />
            <span className="text-xs font-medium flex-1"
              style={{ color: z.color }}
            >
              {z.label}
            </span>
            <span className="text-xs" style={{ color: z.color, opacity: 0.7 }}>
              {z.desc}
            </span>
            {currentStatus === z.status && (
              <span className="text-xs font-medium"
                style={{ color: z.color }}
              >
                ← You
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Your location indicator */}
      <div className="mt-3 pt-3 flex items-center gap-2"
        style={{ borderTop: '0.5px solid rgba(196,149,106,0.2)' }}
      >
        <div className="w-3 h-3 rounded-full flex-shrink-0"
          style={{
            background: '#F4A7B9',
            animation: 'ripple 2s ease-out infinite',
          }}
        />
        <span className="text-xs" style={{ color: '#C4956A' }}>
          Your current location
        </span>
      </div>
    </div>
  )
}