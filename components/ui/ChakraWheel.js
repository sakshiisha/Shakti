export default function ChakraWheel({ size = 48, opacity = 0.15, speed = 20 }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 100 100"
      style={{
        opacity,
        animation: `rotate-slow ${speed}s linear infinite`,
        flexShrink: 0,
      }}
    >
      {/* Outer ring */}
      <circle cx="50" cy="50" r="46"
        fill="none" stroke="#D4A017" strokeWidth="2"/>
      {/* Inner ring */}
      <circle cx="50" cy="50" r="30"
        fill="none" stroke="#D4A017" strokeWidth="1.5"/>
      {/* Center */}
      <circle cx="50" cy="50" r="8"
        fill="#F97316" opacity="0.8"/>
      {/* 8 spokes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1="50" y1="50"
          x2={50 + 46 * Math.cos((i * Math.PI) / 4)}
          y2={50 + 46 * Math.sin((i * Math.PI) / 4)}
          stroke="#D4A017" strokeWidth="1.5" opacity="0.7"
        />
      ))}
      {/* 8 outer dots */}
      {Array.from({ length: 8 }).map((_, i) => (
        <circle
          key={i}
          cx={50 + 38 * Math.cos((i * Math.PI) / 4)}
          cy={50 + 38 * Math.sin((i * Math.PI) / 4)}
          r="4" fill="#D4A017" opacity="0.6"
        />
      ))}
      {/* 8 petal shapes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          cx={50 + 20 * Math.cos((i * Math.PI) / 4)}
          cy={50 + 20 * Math.sin((i * Math.PI) / 4)}
          rx="5" ry="10"
          fill="#F97316" opacity="0.3"
          transform={`rotate(${i * 45} ${50 + 20 * Math.cos((i * Math.PI) / 4)} ${50 + 20 * Math.sin((i * Math.PI) / 4)})`}
        />
      ))}
    </svg>
  )
}