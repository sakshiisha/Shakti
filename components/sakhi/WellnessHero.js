export default function WellnessHero({ periodData = null }) {
  const phaseLabels = {
    menstrual:  'Menstrual',
    follicular: 'Follicular',
    ovulation:  'Ovulation',
    luteal:     'Luteal',
  }

  const getDaysToNext = () => {
    if (!periodData?.nextPeriodDate) return '—'
    const diff = new Date(periodData.nextPeriodDate) - new Date()
    const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
    return `${days} days`
  }

  return (
    <div className="relative overflow-hidden mb-8 rounded-2xl px-6 py-8 sm:px-10 sm:py-12 md:px-16 md:py-16"
      style={{
        background: 'linear-gradient(135deg, #FFF0E8, #FFF8F0)',
        border: '1px solid rgba(232,180,184,0.35)',
      }}
    >
      {/* Blobs */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 rounded-full pointer-events-none"
        style={{ background: 'rgba(244,167,185,0.08)', transform: 'translate(35%,-35%)' }}
      />
      <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-60 sm:h-60 rounded-full pointer-events-none"
        style={{ background: 'rgba(245,200,66,0.08)', transform: 'translate(-35%,35%)' }}
      />

      {/* Lotus — hide on mobile */}
      <div className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <svg width="180" height="180" viewBox="0 0 100 100" fill="#F4A7B9">
          <ellipse cx="50" cy="70" rx="10" ry="20" opacity="0.6"/>
          <ellipse cx="30" cy="60" rx="12" ry="25" opacity="0.7" transform="rotate(-30 30 60)"/>
          <ellipse cx="70" cy="60" rx="12" ry="25" opacity="0.7" transform="rotate(30 70 60)"/>
          <ellipse cx="20" cy="50" rx="10" ry="22" opacity="0.5" transform="rotate(-50 20 50)"/>
          <ellipse cx="80" cy="50" rx="10" ry="22" opacity="0.5" transform="rotate(50 80 50)"/>
          <circle cx="50" cy="50" r="8" fill="#F5C842"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-lg">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
          style={{ background: 'rgba(244,167,185,0.15)', border: '1px solid rgba(244,167,185,0.35)' }}
        >
          <span className="text-base">🌸</span>
          <span className="text-xs sm:text-sm font-medium" style={{ color: '#C4956A' }}>
            Sakhi — Your Wellness Circle
          </span>
        </div>

        {/* Heading — responsive size */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight mb-2 text-[#2C1A0E]"
          style={{ fontFamily: 'Yatra One, cursive' }}
        >
          Body, Mind & Soul
        </h1>
        <h2 className="text-xl sm:text-2xl mb-4"
          style={{ color: '#C4956A', fontFamily: 'Yatra One, cursive' }}
        >
          तन, मन, आत्मा
        </h2>
        <p className="text-sm sm:text-base leading-relaxed mb-6 max-w-sm"
          style={{ color: '#C4956A' }}
        >
          Track your cycle, honor your emotions, and discover ancient wisdom for modern life.
        </p>

        {/* Stats */}
        <div className="flex gap-6 sm:gap-10 flex-wrap">
          {[
            {
              num:   periodData?.currentDay ? `Day ${periodData.currentDay}` : 'Day —',
              label: 'Cycle Day',
            },
            {
              num:   periodData?.currentPhase
                ? phaseLabels[periodData.currentPhase]
                : '—',
              label: 'Current Phase',
            },
            {
              num:   getDaysToNext(),
              label: 'Next Period',
            },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-xl sm:text-2xl mb-0.5 capitalize"
                style={{ color: '#F4A7B9', fontFamily: 'Yatra One, cursive' }}
              >
                {s.num}
              </div>
              <div className="text-xs sm:text-sm" style={{ color: '#C4956A' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}