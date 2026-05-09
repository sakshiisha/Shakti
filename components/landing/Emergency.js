'use client'

export default function Emergency() {
  return (
    <section className="bg-[#7C1D1D] py-20 px-6 relative overflow-hidden">

      {/* Diya row */}
      <div className="flex justify-around mb-12">
        {[0,1,2,3,4].map((i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full bg-gradient-to-t from-[#F97316] to-[#D4A017]"
            style={{
              animation: 'flicker 1.5s ease-in-out infinite',
              animationDelay: `${i * 0.3}s`,
              filter: 'drop-shadow(0 0 8px rgba(249,115,22,0.6))'
            }}
          />
        ))}
      </div>

      {/* Twinkling stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FDF6EC] rounded-full"
            style={{
              top: `${(i * 37 + 11) % 100}%`,
              left: `${(i * 53 + 7) % 100}%`,
              animation: 'twinkle 3s ease-in-out infinite',
              animationDelay: `${(i * 0.3) % 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2
          className="text-5xl text-[#FDF6EC] mb-4"
          style={{ fontFamily: 'Yatra One, cursive' }}
        >
          एक क्लिक — Emergency Help
        </h2>
        <p className="text-[#FDF6EC]/90 text-xl mb-12">
          One press sends help to 3 contacts + police
        </p>

        {/* SOS Button */}
        <div className="relative inline-block">
          {/* Ripple rings */}
          {[0, 0.5, 1].map((delay) => (
            <div
              key={delay}
              className="absolute inset-0 rounded-full border-2 border-[#FDF6EC]/30"
              style={{
                animation: 'ripple 2s ease-out infinite',
                animationDelay: `${delay}s`
              }}
            />
          ))}

          <button
            className="relative w-56 h-56 rounded-full border-8 border-[#FDF6EC] transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #9B2222, #5A1515)',
              boxShadow: '0 0 40px rgba(124,29,29,0.6)'
            }}
            onClick={() => alert('🚨 Help sent to your emergency contacts!')}
          >
            <div className="text-5xl mb-1">🆘</div>
            <div
              className="text-2xl text-[#FDF6EC]"
              style={{ fontFamily: 'Yatra One, cursive' }}
            >
              SOS
            </div>
            <div className="text-xs text-[#FDF6EC]/80 mt-1">
              Press & Hold
            </div>
          </button>
        </div>

        {/* Feature pills */}
        <div className="mt-12 grid grid-cols-3 gap-6 text-[#FDF6EC]">
          {[
            { icon: '📍', label: 'GPS Location' },
            { icon: '📱', label: 'SMS Alert' },
            { icon: '🚔', label: 'Police Alert' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="text-sm opacity-90">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}