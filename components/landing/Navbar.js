import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDF6EC] border-b-4 border-[#D4A017]/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <span
            className="text-3xl"
            style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
          >
            ॐ
          </span>
          <span
            className="text-2xl text-[#1C1008]"
            style={{
              fontFamily: 'Yatra One, cursive',
              animation: 'pulse-glow 3s ease-in-out infinite'
            }}
          >
            SHAKTI
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Safety', 'Wellness', 'Community'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#1C1008] hover:text-[#F97316] transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A017] group-hover:w-full transition-all duration-500" />
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 border border-[#7C1D1D] text-[#7C1D1D] rounded-lg hover:bg-[#7C1D1D] hover:text-[#FDF6EC] transition-all duration-300 text-sm"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-[#F97316] text-[#FDF6EC] rounded-lg hover:shadow-lg transition-all duration-300 text-sm"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Diya Row */}
      <div className="flex justify-around px-6 pb-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full bg-gradient-to-t from-[#F97316] to-[#D4A017]"
            style={{
              animation: 'flicker 1.5s ease-in-out infinite',
              animationDelay: `${i * 0.3}s`,
              filter: 'drop-shadow(0 0 6px rgba(249,115,22,0.6))'
            }}
          />
        ))}
      </div>
    </nav>
  )
}