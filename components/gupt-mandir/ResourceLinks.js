const RESOURCES = [
  {
    icon: '📚',
    title: 'Educational Library',
    subtitle: 'Learn & Explore',
    description: "Comprehensive guides on women's health, anatomy, and wellness.",
    color: '#C4956A',
    bg: '#FFF8F0',
    border: 'rgba(196,149,106,0.3)',
  },
  {
    icon: '🩺',
    title: 'Find Trusted Doctors',
    subtitle: 'Professional Care',
    description: "Verified gynecologists and women's health specialists near you.",
    color: '#2D6A4F',
    bg: 'rgba(45,106,79,0.05)',
    border: 'rgba(45,106,79,0.2)',
  },
  {
    icon: '☎️',
    title: 'Crisis Helpline — 181',
    subtitle: 'Emergency Support',
    description: '24/7 confidential support for urgent health and safety concerns.',
    color: '#5C1F1F',
    bg: 'rgba(92,31,31,0.05)',
    border: 'rgba(92,31,31,0.2)',
  },
]

export default function ResourceLinks() {
  return (
    <div
      className="rounded-2xl p-4 sm:p-6"
      style={{ background: '#FFF8F0', border: '1px solid rgba(196,149,106,0.25)' }}
    >
      {/* Heading */}
      <h2
        className="text-xl sm:text-2xl text-[#2C1A0E] mb-1"
        style={{ fontFamily: 'Yatra One, cursive' }}
      >
        Support Resources
      </h2>

      <p className="text-[11px] sm:text-xs mb-4 sm:mb-5" style={{ color: '#C4956A' }}>
        सहायता संसाधन — Help is always available
      </p>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {RESOURCES.map((r, i) => (
          <div
            key={i}
            className="
              rounded-2xl 
              p-4 sm:p-5 
              transition-all duration-300 
              active:scale-95 sm:hover:scale-105 sm:hover:shadow-lg 
              cursor-pointer group
            "
            style={{ background: r.bg, border: `1px solid ${r.border}` }}
          >
            {/* Icon */}
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{r.icon}</div>

            {/* Title */}
            <h3
              className="text-base sm:text-lg mb-1 leading-tight"
              style={{ color: r.color, fontFamily: 'Yatra One, cursive' }}
            >
              {r.title}
            </h3>

            {/* Subtitle */}
            <p
              className="text-[11px] sm:text-xs italic mb-2"
              style={{ color: '#F5C842' }}
            >
              {r.subtitle}
            </p>

            {/* Description */}
            <p
              className="text-[12px] sm:text-xs leading-relaxed mb-3 sm:mb-4"
              style={{ color: 'rgba(44,26,14,0.8)' }}
            >
              {r.description}
            </p>

            {/* CTA */}
            <div
              className="
                flex items-center gap-2 
                transition-all duration-200 
                sm:group-hover:gap-3
              "
              style={{ color: '#F4A7B9' }}
            >
              <span className="text-xs font-medium">Explore</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}