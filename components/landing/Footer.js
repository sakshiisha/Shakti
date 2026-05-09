'use client'

export default function Footer() {
  return (
    <footer className="bg-[#7C1D1D] py-16 px-6 relative overflow-hidden">

      {/* Twinkling stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FDF6EC] rounded-full"
            style={{
              top: `${(i * 41 + 13) % 100}%`,
              left: `${(i * 67 + 19) % 100}%`,
              animation: 'twinkle 4s ease-in-out infinite',
              animationDelay: `${(i * 0.2) % 4}s`
            }}
          />
        ))}
      </div>

      {/* Om watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className="text-[200px] text-[#D4A017] opacity-5 select-none"
          style={{ animation: 'rotate-slow 60s linear infinite' }}
        >
          ॐ
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <h3
              className="text-xl text-[#FDF6EC] mb-4"
              style={{ fontFamily: 'Yatra One, cursive' }}
            >
              ॐ SHAKTI
            </h3>
            <p className="text-[#FDF6EC]/80 text-sm leading-relaxed">
              Har naari ki suraksha hamare liye sabse pehle hai.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-[#FDF6EC] mb-4"
              style={{ fontFamily: 'Yatra One, cursive' }}
            >
              Services
            </h4>
            <ul className="space-y-2 text-[#FDF6EC]/80 text-sm">
              {['Emergency SOS', 'Live Tracking', 'Safe Zones', 'Community Support'].map((s) => (
                <li key={s} className="hover:text-[#D4A017] cursor-pointer transition-colors">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[#FDF6EC] mb-4"
              style={{ fontFamily: 'Yatra One, cursive' }}
            >
              Contact
            </h4>
            <ul className="space-y-2 text-[#FDF6EC]/80 text-sm">
              <li>Emergency: 112</li>
              <li>Helpline: 181</li>
              <li>help@shakti.in</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4
              className="text-[#FDF6EC] mb-4"
              style={{ fontFamily: 'Yatra One, cursive' }}
            >
              Connect
            </h4>
            <div className="flex gap-3">
              {['📱', '💬', '📧'].map((icon) => (
                <div
                  key={icon}
                  className="w-10 h-10 bg-[#FDF6EC]/10 rounded-full flex items-center justify-center hover:bg-[#FDF6EC]/20 transition-colors cursor-pointer text-lg"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#FDF6EC]/20 pt-8 text-center">
          <p className="text-[#FDF6EC]/90">
            Made with ❤ for every woman in Bharat
          </p>
          <p className="text-[#FDF6EC]/60 text-sm mt-2">
            © 2026 SHAKTI. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}