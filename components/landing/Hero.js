import FallingPetals from './FallingPetals'
import RotatingMandala from './RotatingMandala'
import TypewriterText from './TypewriterText'
import Link from 'next/link'

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen relative pt-32 pb-20 px-6 overflow-hidden"
    >
      {/* Background animations */}
      <FallingPetals />
      <RotatingMandala />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left Side */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D6A4F]/10 border border-[#2D6A4F]/30 rounded-full">
            <span>🛡</span>
            <span className="text-[#2D6A4F] font-medium text-sm">
              Abhaya — Women Safety Platform
            </span>
          </div>

          <h1
            className="text-6xl md:text-7xl text-[#1C1008] leading-tight"
            style={{ fontFamily: 'Yatra One, cursive' }}
          >
            तुम्हारी सुरक्षा
          </h1>

          <h2
            className="text-3xl text-[#1C1008]/70"
            style={{ fontFamily: 'Yatra One, cursive' }}
          >
            Your Safety, Our Dharma
          </h2>

          <TypewriterText text="तुम्हारी सुरक्षा, हमारी प्राथमिकता..." />

          <div className="flex gap-4 pt-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-[#F97316] text-[#FDF6EC] rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started — Free
            </Link>
            <Link
              href="#safety"
              className="px-8 py-4 border-2 border-[#7C1D1D] text-[#7C1D1D] rounded-lg hover:bg-[#7C1D1D] hover:text-[#FDF6EC] transition-all duration-300"
            >
              See How It Works
            </Link>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            {[
              { num: '50K+', label: 'Women Protected' },
              { num: '100+', label: 'Cities Active' },
              { num: '24/7', label: 'Support' },
            ].map((item) => (
              <div key={item.label}>
                <div
                  className="text-3xl text-[#F97316]"
                  style={{ fontFamily: 'Yatra One, cursive' }}
                >
                  {item.num}
                </div>
                <div className="text-sm text-[#1C1008]/70">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side — Phone Mockup */}
        <div className="relative flex justify-center">
          <div className="w-72 h-[560px] bg-[#1C1008] rounded-[3rem] border-8 border-[#1C1008] shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2D6A4F]/20 to-[#F97316]/20 p-6 flex flex-col justify-center">
              <div className="text-center text-[#FDF6EC] space-y-4">
                <div className="text-xs opacity-70 tracking-widest uppercase">
                  Live Safety Zones
                </div>
                <div className="relative w-full h-52 bg-[#FDF6EC]/10 rounded-xl">
                  {/* Pulsing dot */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-[#2D6A4F] rounded-full animate-ping absolute" />
                    <div className="w-4 h-4 bg-[#2D6A4F] rounded-full" />
                  </div>
                  {/* Zone badge */}
                  <div className="absolute top-3 right-3 bg-[#2D6A4F] text-[#FDF6EC] px-3 py-1 rounded-full text-xs">
                    Safe Zone ✓
                  </div>
                </div>
                <div className="space-y-2 text-left">
                  {['🏥 Hospital: 0.5 km', '🚔 Police: 0.8 km', '👥 234 online nearby'].map((item) => (
                    <div
                      key={item}
                      className="bg-[#FDF6EC]/10 px-4 py-2 rounded-lg text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}