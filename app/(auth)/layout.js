export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center relative overflow-hidden">

      {/* Background mandala */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <svg
          width="600" height="600"
          viewBox="0 0 200 200"
          style={{ opacity: 0.04, animation: 'rotate-slow 60s linear infinite' }}
        >
          <circle cx="100" cy="100" r="90" fill="none" stroke="#D4A017" strokeWidth="0.5"/>
          <circle cx="100" cy="100" r="70" fill="none" stroke="#D4A017" strokeWidth="0.5"/>
          <circle cx="100" cy="100" r="50" fill="none" stroke="#D4A017" strokeWidth="0.5"/>
          <circle cx="100" cy="100" r="30" fill="none" stroke="#D4A017" strokeWidth="0.5"/>
          {[0,1,2,3,4,5,6,7].map((i) => (
            <line
              key={i}
              x1="100" y1="100"
              x2={100 + 90 * Math.cos((i * Math.PI) / 4)}
              y2={100 + 90 * Math.sin((i * Math.PI) / 4)}
              stroke="#D4A017" strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      {/* Falling petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: 10, delay: 0,  dur: 8  },
          { left: 25, delay: 3,  dur: 10 },
          { left: 50, delay: 6,  dur: 7  },
          { left: 70, delay: 1,  dur: 9  },
          { left: 88, delay: 4,  dur: 11 },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-3 rounded-full opacity-50"
            style={{
              left: `${p.left}%`,
              top: '-10px',
              background: i % 2 === 0 ? '#F97316' : '#FF9A6C',
              animation: `fall ${p.dur}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        {children}
      </div>

    </div>
  )
}