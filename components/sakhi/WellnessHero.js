export default function WellnessHero() {
  return (
    <div
      className="relative overflow-hidden mb-12 rounded-3xl px-16 py-20"
      style={{
        background: 'linear-gradient(135deg, #FFF0E8, #FFF8F0)',
        border: '1px solid rgba(232,180,184,0.35)',
        boxShadow: '0 20px 80px rgba(196,149,106,0.15)'
      }}
    >
      {/* glow blobs BIG */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'rgba(244,167,185,0.08)',
          transform: 'translate(35%,-35%)'
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'rgba(245,200,66,0.08)',
          transform: 'translate(-35%,35%)'
        }}
      />

      {/* BIG lotus decoration */}
      <div className="absolute right-24 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <svg width="260" height="260" viewBox="0 0 100 100" fill="#F4A7B9">
          <ellipse cx="50" cy="70" rx="10" ry="20" opacity="0.6"/>
          <ellipse cx="30" cy="60" rx="12" ry="25" opacity="0.7" transform="rotate(-30 30 60)"/>
          <ellipse cx="70" cy="60" rx="12" ry="25" opacity="0.7" transform="rotate(30 70 60)"/>
          <ellipse cx="20" cy="50" rx="10" ry="22" opacity="0.5" transform="rotate(-50 20 50)"/>
          <ellipse cx="80" cy="50" rx="10" ry="22" opacity="0.5" transform="rotate(50 80 50)"/>
          <circle cx="50" cy="50" r="8" fill="#F5C842"/>
        </svg>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-2xl">

        {/* badge BIG */}
        <div
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full mb-6"
          style={{
            background: 'rgba(244,167,185,0.15)',
            border: '1px solid rgba(244,167,185,0.35)'
          }}
        >
          <span className="text-xl">🌸</span>
          <span className="text-sm font-medium" style={{ color: '#C4956A' }}>
            Sakhi — Your Wellness Circle
          </span>
        </div>

        {/* BIG heading */}
        <h1
          className="text-7xl leading-tight mb-3 text-[#2C1A0E]"
          style={{ fontFamily: 'Yatra One, cursive' }}
        >
          Body, Mind & Soul
        </h1>

        <h2
          className="text-3xl mb-6"
          style={{ color: '#C4956A', fontFamily: 'Yatra One, cursive' }}
        >
          तन, मन, आत्मा
        </h2>

        {/* BIG description */}
        <p
          className="text-lg leading-relaxed mb-10 max-w-xl"
          style={{ color: '#C4956A' }}
        >
          A sacred space for your health, moods, and womanhood.
          Track your cycle, honor your emotions, and discover
          ancient wisdom for modern life.
        </p>

        {/* BIG stats */}
        <div className="flex gap-16">
          {[
            { num: 'Day 14',    label: 'Cycle Day'      },
            { num: 'Ovulation', label: 'Current Phase'  },
            { num: '12 Days',   label: 'Next Period'    },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="text-3xl mb-1"
                style={{ color: '#F4A7B9', fontFamily: 'Yatra One, cursive' }}
              >
                {s.num}
              </div>
              <div className="text-sm" style={{ color: '#C4956A' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}