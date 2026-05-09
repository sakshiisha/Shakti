export default function DivaFlame({ size = 20, delay = 0 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(to top, #F97316, #D4A017)',
        animation: 'flicker 1.5s ease-in-out infinite',
        animationDelay: `${delay}s`,
        filter: `drop-shadow(0 0 ${size / 3}px rgba(249,115,22,0.6))`,
        flexShrink: 0,
      }}
    />
  )
}