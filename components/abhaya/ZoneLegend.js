export default function ZoneLegend({ currentStatus = 'safe' }) {
  const zones = [
    { status: 'safe',    emoji: '🟢', color: '#2D6A4F', bg: 'rgba(45,106,79,0.08)',  label: 'Safe Zone',    desc: '10+ women nearby' },
    { status: 'caution', emoji: '🟡', color: '#C4956A', bg: 'rgba(196,149,106,0.1)', label: 'Caution Zone', desc: 'Few women nearby' },
    { status: 'unsafe',  emoji: '🔴', color: '#7C1D1D', bg: 'rgba(124,29,29,0.08)',  label: 'Unsafe Zone',  desc: 'Alone or distress reports' },
  ]

  return (
    <div style={{
      borderRadius: '14px', padding: '14px 16px',
      background: 'white', border: '1px solid rgba(196,149,106,0.2)',
    }}>
      <p style={{
        fontSize: '11px', fontWeight: 500, color: '#C4956A',
        margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.5px',
      }}>
        How Zone Safety Works
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {zones.map((z) => (
          <div key={z.status} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '8px 12px', borderRadius: '10px',
            background: currentStatus === z.status ? z.bg : 'transparent',
            border: currentStatus === z.status
              ? `1.5px solid ${z.color}50`
              : '1.5px solid transparent',
          }}>
            <span style={{ fontSize: '16px' }}>{z.emoji}</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: z.color }}>
                {z.label}
              </span>
              <span style={{ fontSize: '12px', color: z.color, opacity: 0.75, marginLeft: '6px' }}>
                — {z.desc}
              </span>
            </div>
            {currentStatus === z.status && (
              <span style={{ fontSize: '11px', color: z.color, fontWeight: 600 }}>
                ← You
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}