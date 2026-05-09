export default function LotusLoader({ size = 'md', text = 'Loading...' }) {
  const sizes = {
    sm: { svg: 40,  font: '11px' },
    md: { svg: 64,  font: '13px' },
    lg: { svg: 96,  font: '15px' },
  }
  const s = sizes[size]

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <svg
        width={s.svg} height={s.svg}
        viewBox="0 0 100 100"
        fill="#F4A7B9"
        style={{ animation: 'bloom 1.5s ease-out infinite alternate' }}
      >
        <ellipse cx="50" cy="70" rx="10" ry="20" opacity="0.6"/>
        <ellipse cx="30" cy="60" rx="12" ry="25" opacity="0.7"
          transform="rotate(-30 30 60)"/>
        <ellipse cx="70" cy="60" rx="12" ry="25" opacity="0.7"
          transform="rotate(30 70 60)"/>
        <ellipse cx="20" cy="50" rx="10" ry="22" opacity="0.5"
          transform="rotate(-50 20 50)"/>
        <ellipse cx="80" cy="50" rx="10" ry="22" opacity="0.5"
          transform="rotate(50 80 50)"/>
        <circle cx="50" cy="50" r="8" fill="#F5C842"/>
      </svg>
      <p style={{ fontSize: s.font, color: '#C4956A' }}>{text}</p>
    </div>
  )
}