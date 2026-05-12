export default function GuptHero() {
  return (
    <div className="rounded-2xl p-6 sm:p-8 md:p-10 text-center mb-8 relative overflow-hidden"
      style={{ background: '#4A1A1A' }}
    >
      {/* Om watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          fontSize: 'clamp(120px, 25vw, 200px)',
          color: '#F5C842',
          opacity: 0.04,
          animation: 'rotate-slow 60s linear infinite',
          fontFamily: 'Yatra One, cursive',
          lineHeight: 1,
        }}
      >
        ॐ
      </div>

      {/* Incense smoke */}
      <div className="absolute bottom-0 pointer-events-none left-1/4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="absolute bottom-0"
            style={{
              left: `${i * 20}px`,
              width: '1px',
              height: '60px',
              background: 'linear-gradient(to top, rgba(255,248,240,0.15), transparent)',
              animation: `fall ${3 + i}s ease-in-out infinite reverse`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl mb-3"
          style={{ color: '#F5C842', fontFamily: 'Yatra One, cursive' }}
        >
          Gupt Mandir
        </h1>

        <p className="text-sm sm:text-base mb-1"
          style={{ color: 'rgba(255,248,240,0.9)' }}
        >
          This space belongs only to you
        </p>

        <p className="text-xs sm:text-sm mb-6"
          style={{ color: 'rgba(255,248,240,0.5)' }}
        >
          यह जगह सिर्फ तुम्हारी है
        </p>

        {/* Trust pills */}
        <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
          {['🔒 Encrypted', '👤 Anonymous', '👩‍⚕️ Doctor Reviewed', '🛡 Protected'].map((pill) => (
            <span key={pill} className="text-[11px] sm:text-xs px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(245,200,66,0.12)',
                color: '#F5C842',
                border: '1px solid rgba(245,200,66,0.25)',
              }}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}