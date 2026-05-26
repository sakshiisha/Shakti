export default function NearbyResources({ resources = [] }) {
  return (
    <div style={{
      borderRadius: '16px', padding: '16px',
      background: 'white', border: '1px solid rgba(196,149,106,0.2)',
    }}>
      <p style={{
        fontSize: '11px', fontWeight: 500, color: '#C4956A',
        margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.5px',
      }}>
        Nearest Help
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {resources.map((r, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px', borderRadius: '10px',
            background: 'rgba(196,149,106,0.07)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>{r.icon}</span>
              <span style={{ fontSize: '13px', color: '#2C1A0E' }}>{r.label}</span>
            </div>
            {r.label.includes('112') ? (
              <a href="tel:112" style={{
                fontSize: '12px', color: '#7C1D1D',
                fontWeight: 600, textDecoration: 'none',
              }}>
                Call Now
              </a>
            ) : (
              <span style={{ fontSize: '12px', color: '#2D6A4F', fontWeight: 500 }}>
                {r.dist}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}