import CounterStat from './CounterStat'

export default function StatsBar() {
  return (
    <section className="bg-[#7C1D1D] py-16 px-6 relative">

      {/* Diya row */}
      <div className="flex justify-around mb-8">
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

      {/* Stats grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <CounterStat end={50000} label="Women Protected" suffix="+" />
        <CounterStat end={127}   label="Cities Active"   suffix="+" />
        <CounterStat end={15000} label="Alerts Sent"     suffix="+" />
        <CounterStat end={500}   label="Doctors"         suffix="+" />
      </div>

    </section>
  )
}