import LotusDivider from './LotusDivider'

export default function SafetyMap() {
  return (
    <section id="safety" className="py-20 px-6 bg-[#FDF6EC]">
      <LotusDivider />

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2
          className="text-5xl text-center mb-4 text-[#1C1008]"
          style={{ fontFamily: 'Yatra One, cursive' }}
        >
          <span className="relative inline-block">
            Map — Live Safety Map
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" />
          </span>
        </h2>
        <p className="text-center text-[#1C1008]/70 mb-16">
          Real-time safety zones across India
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left — Map Visual */}
          <div
            className="relative p-8 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(45,106,79,0.1), rgba(249,115,22,0.1))',
              border: '2px solid rgba(212,160,23,0.2)'
            }}
          >
            {/* Map SVG */}
            <div className="h-96 flex items-center justify-center relative">
              <svg
                className="w-full h-full"
                viewBox="0 0 400 400"
              >
                {/* Zone rings */}
                <circle
                  cx="200" cy="200" r="60"
                  fill="rgba(45,106,79,0.15)"
                  stroke="#2D6A4F"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <circle
                  cx="200" cy="200" r="110"
                  fill="rgba(249,115,22,0.08)"
                  stroke="#F97316"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <circle
                  cx="200" cy="200" r="160"
                  fill="rgba(124,29,29,0.06)"
                  stroke="#7C1D1D"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />

                {/* Zone labels */}
                <text
                  x="200" y="155"
                  textAnchor="middle"
                  fill="#2D6A4F"
                  fontSize="11"
                  fontWeight="500"
                >
                  Safe
                </text>
                <text
                  x="200" y="103"
                  textAnchor="middle"
                  fill="#F97316"
                  fontSize="11"
                  fontWeight="500"
                >
                  Caution
                </text>
                <text
                  x="200" y="48"
                  textAnchor="middle"
                  fill="#7C1D1D"
                  fontSize="11"
                  fontWeight="500"
                >
                  Unsafe
                </text>

                {/* Nearby location dots */}
                {[
                  { cx: 260, cy: 170, color: '#2D6A4F' },
                  { cx: 150, cy: 230, color: '#2D6A4F' },
                  { cx: 240, cy: 250, color: '#F97316' },
                  { cx: 130, cy: 160, color: '#7C1D1D' },
                  { cx: 300, cy: 220, color: '#F97316' },
                ].map((dot, i) => (
                  <circle
                    key={i}
                    cx={dot.cx}
                    cy={dot.cy}
                    r="5"
                    fill={dot.color}
                    opacity="0.7"
                  />
                ))}

                {/* User location — pulsing dot */}
                <circle
                  cx="200" cy="200" r="16"
                  fill="rgba(45,106,79,0.2)"
                />
                <circle
                  cx="200" cy="200" r="8"
                  fill="#2D6A4F"
                />
                <circle
                  cx="200" cy="200" r="4"
                  fill="#FDF6EC"
                />
              </svg>

              {/* Pulsing animation overlay */}
              <div className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div
                  className="w-8 h-8 rounded-full bg-[#2D6A4F]/30"
                  style={{ animation: 'ripple 2s ease-out infinite' }}
                />
              </div>
            </div>

            {/* Zone Legend */}
            <div className="flex justify-center gap-6 mt-4">
              {[
                { color: '#2D6A4F', label: 'Safe' },
                { color: '#F97316', label: 'Caution' },
                { color: '#7C1D1D', label: 'Unsafe' },
              ].map((zone) => (
                <div key={zone.label} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: zone.color }}
                  />
                  <span className="text-xs text-[#1C1008]/70">
                    {zone.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Feature Cards */}
          <div className="space-y-6">
            {[
              {
                icon: '🏥',
                title: 'Nearest Help',
                titleHi: 'Nearby Assistance',
                desc: 'Nearest hospitals, police stations aur safe zones real-time mein dhundho',
              },
              {
                icon: '📍',
                title: 'Live Tracking',
                titleHi: 'Live Tracking',
                desc: 'Apni live location trusted contacts ke saath automatically share karo',
              },
              {
                icon: '⚡',
                title: 'Instant Help',
                titleHi: 'Instant Help',
                desc: 'One-touch emergency alerts police aur tumhare safety circle ko',
              },
              {
                icon: '👥',
                title: 'Community',
                titleHi: 'Community',
                desc: 'Nearby women se connect karo aur ek doosre ki madad karo',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-xl border-l-4 border-[#D4A017] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  animation: 'reveal 0.6s ease-out',
                  animationDelay: `${index * 0.15}s`,
                  animationFillMode: 'both'
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3
                      className="text-lg text-[#1C1008] mb-1"
                      style={{ fontFamily: 'Yatra One, cursive' }}
                    >
                      {item.titleHi}
                    </h3>
                    <p className="text-sm text-[#1C1008]/60 mb-1">
                      {item.title}
                    </p>
                    <p className="text-[#1C1008]/70 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA */}
            <button
              className="w-full py-4 rounded-xl text-[#FDF6EC] font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ background: 'linear-gradient(135deg, #F97316, #7C1D1D)' }}
            >
              Try Live Map →
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}