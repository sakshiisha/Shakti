export default function BindiDivider({ color = '#F97316', count = 9 }) {
  return (
    <div className="flex items-center justify-center gap-3 my-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width:  i === Math.floor(count / 2) ? 12 : 8,
            height: i === Math.floor(count / 2) ? 12 : 8,
            background: color,
            opacity: i === Math.floor(count / 2) ? 1 : 0.5,
            animation: 'bloom 0.5s ease-out both',
            animationDelay: `${i * 0.08}s`,
          }}
        />
      ))}
    </div>
  )
}