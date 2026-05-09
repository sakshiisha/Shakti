export default function WellnessHero() {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 p-10"
      style={{ background: 'linear-gradient(135deg, #FFF0E8, #FFF8F0)', border: '1px solid rgba(232,180,184,0.3)' }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'rgba(244,167,185,0.08)', transform: 'translate(30%,-30%)' }}
      />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'rgba(245,200,66,0.08)', transform: 'translate(-30%,30%)' }}
      />

      {/* Lotus decoration */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none opacity-10">
        <svg width="160" height="160" viewBox="0 0 100 100" fill="#F4A7B9">
          <ellipse cx="50" cy="70" rx="10" ry="20" opacity="0.6"/>
          <ellipse cx="30" cy="60" rx="12" ry="25" opacity="0.7" transform="rotate(-30 30 60)"/>
          <ellipse cx="70" cy="60" rx="12" ry="25" opacity="0.7" transform="rotate(30 70 60)"/>
          <ellipse cx="20" cy="50" rx="10" ry="22" opacity="0.5" transform="rotate(-50 20 50)"/>
          <ellipse cx="80" cy="50" rx="10" ry="22" opacity="0.5" transform="rotate(50 80 50)"/>
          <circle cx="50" cy="50" r="8" fill="#F5C842"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-lg">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
          style={{ background: 'rgba(244,167,185,0.15)', border: '1px solid rgba(244,167,185,0.3)' }}
        >
          <span className="text-sm">🌸</span>
          <span className="text-xs font-medium" style={{ color: '#C4956A' }}>
            Sakhi — Your Wellness Circle
          </span>
        </div>

        <h1 className="text-5xl text-[#2C1A0E] mb-2 leading-tight"
          style={{ fontFamily: 'Yatra One, cursive' }}
        >
          Body, Mind & Soul
        </h1>
        <h2 className="text-xl mb-4" style={{ color: '#C4956A', fontFamily: 'Yatra One, cursive' }}>
          तन, मन, आत्मा
        </h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: '#C4956A' }}>
          A sacred space for your health, moods, and womanhood.
          Track your cycle, honor your emotions, and discover
          ancient wisdom for modern life.
        </p>

        <div className="flex gap-6">
          {[
            { num: 'Day 14',    label: 'Cycle day'      },
            { num: 'Ovulation', label: 'Current phase'  },
            { num: '12 days',   label: 'To next period' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-lg font-medium"
                style={{ color: '#F4A7B9', fontFamily: 'Yatra One, cursive' }}
              >
                {s.num}
              </div>
              <div className="text-xs" style={{ color: '#C4956A' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}