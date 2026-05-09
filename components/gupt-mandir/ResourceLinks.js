const RESOURCES = [
  {
    icon:        '📚',
    title:       'Educational Library',
    subtitle:    'Learn & Explore',
    description: "Comprehensive guides on women's health, anatomy, and wellness.",
    color:       '#C4956A',
    bg:          '#FFF8F0',
    border:      'rgba(196,149,106,0.3)',
  },
  {
    icon:        '🩺',
    title:       'Find Trusted Doctors',
    subtitle:    'Professional Care',
    description: "Verified gynecologists and women's health specialists near you.",
    color:       '#2D6A4F',
    bg:          'rgba(45,106,79,0.05)',
    border:      'rgba(45,106,79,0.2)',
  },
  {
    icon:        '☎️',
    title:       'Crisis Helpline — 181',
    subtitle:    'Emergency Support',
    description: '24/7 confidential support for urgent health and safety concerns.',
    color:       '#5C1F1F',
    bg:          'rgba(92,31,31,0.05)',
    border:      'rgba(92,31,31,0.2)',
  },
]

export default function ResourceLinks() {
  return (
    <div className="rounded-2xl p-6"
      style={{ background: '#FFF8F0', border: '1px solid rgba(196,149,106,0.25)' }}
    >
      <h2 className="text-2xl text-[#2C1A0E] mb-1"
        style={{ fontFamily: 'Yatra One, cursive' }}
      >
        Support Resources
      </h2>
      <p className="text-xs mb-5" style={{ color: '#C4956A' }}>
        सहायता संसाधन — Help is always available
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {RESOURCES.map((r, i) => (
          <div key={i}
            className="rounded-2xl p-5 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group"
            style={{ background: r.bg, border: `1px solid ${r.border}` }}
          >
            <div className="text-4xl mb-3">{r.icon}</div>
            <h3 className="text-lg mb-1 transition-colors duration-200"
              style={{ color: r.color, fontFamily: 'Yatra One, cursive' }}
            >
              {r.title}
            </h3>
            <p className="text-xs italic mb-2"
              style={{ color: '#F5C842' }}
            >
              {r.subtitle}
            </p>
            <p className="text-xs leading-relaxed mb-4"
              style={{ color: 'rgba(44,26,14,0.8)' }}
            >
              {r.description}
            </p>
            <div className="flex items-center gap-2 transition-all duration-200 group-hover:gap-3"
              style={{ color: '#F4A7B9' }}
            >
              <span className="text-xs font-medium">Explore</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 12L10 8L6 4"
                  stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}