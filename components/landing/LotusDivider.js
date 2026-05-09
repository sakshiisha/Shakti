export default function LotusDivider() {
  return (
    <div className="flex justify-center my-16">
      <svg
        width="64"
        height="64"
        viewBox="0 0 100 100"
        fill="#D4A017"
        style={{ animation: 'bloom 1.5s ease-out' }}
      >
        <ellipse cx="50" cy="70" rx="10" ry="20" opacity="0.6" />
        <ellipse cx="30" cy="60" rx="12" ry="25" opacity="0.7"
          transform="rotate(-30 30 60)" />
        <ellipse cx="70" cy="60" rx="12" ry="25" opacity="0.7"
          transform="rotate(30 70 60)" />
        <ellipse cx="20" cy="50" rx="10" ry="22" opacity="0.5"
          transform="rotate(-50 20 50)" />
        <ellipse cx="80" cy="50" rx="10" ry="22" opacity="0.5"
          transform="rotate(50 80 50)" />
        <circle cx="50" cy="50" r="8" fill="#F97316" />
      </svg>
    </div>
  )
}