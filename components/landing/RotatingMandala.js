export default function RotatingMandala() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
      <svg
        width="800"
        height="800"
        viewBox="0 0 200 200"
        style={{
          opacity: 0.05,
          animation: 'rotate-slow 60s linear infinite',
        }}
      >
        {/* Outer circles */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="#D4A017" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#D4A017" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="#D4A017" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="30" fill="none" stroke="#D4A017" strokeWidth="0.5" />

        {/* 8 spokes */}
        {[0,1,2,3,4,5,6,7].map((i) => (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={100 + 90 * Math.cos((i * Math.PI) / 4)}
            y2={100 + 90 * Math.sin((i * Math.PI) / 4)}
            stroke="#D4A017"
            strokeWidth="0.5"
          />
        ))}

        {/* Outer dots */}
        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((i) => (
          <circle
            key={i}
            cx={100 + 70 * Math.cos((i * Math.PI) / 8)}
            cy={100 + 70 * Math.sin((i * Math.PI) / 8)}
            r="4"
            fill="#D4A017"
            opacity="0.4"
          />
        ))}

        {/* Inner dots */}
        {[0,1,2,3,4,5,6,7].map((i) => (
          <circle
            key={i}
            cx={100 + 50 * Math.cos((i * Math.PI) / 4)}
            cy={100 + 50 * Math.sin((i * Math.PI) / 4)}
            r="3"
            fill="#F97316"
            opacity="0.3"
          />
        ))}

        {/* Petal shapes */}
        {[0,1,2,3,4,5,6,7].map((i) => (
          <ellipse
            key={i}
            cx={100 + 30 * Math.cos((i * Math.PI) / 4)}
            cy={100 + 30 * Math.sin((i * Math.PI) / 4)}
            rx="6"
            ry="12"
            fill="#D4A017"
            opacity="0.2"
            transform={`rotate(${i * 45} ${100 + 30 * Math.cos((i * Math.PI) / 4)} ${100 + 30 * Math.sin((i * Math.PI) / 4)})`}
          />
        ))}

        {/* Center circle */}
        <circle cx="100" cy="100" r="6" fill="#F97316" opacity="0.5" />
      </svg>
    </div>
  )
}