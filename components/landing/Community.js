import LotusDivider from './LotusDivider'

export default function Community() {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai',
      text: 'SHAKTI ne mujhe safe feel karaya. Raat ko akele ghar jaate waqt ab darr nahi lagta.',
    },
    {
      id: 2,
      name: 'Ananya Singh',
      location: 'Delhi',
      text: 'Yeh app ek lifesaver hai. Meri family ko hamesha pata rehta hai main kahan hoon.',
    },
    {
      id: 3,
      name: 'Kavita Desai',
      location: 'Bangalore',
      text: 'Community support bahut amazing hai. Hum sab ek doosre ka khayal rakhte hain.',
    },
  ]

  return (
    <section id="community" className="py-20 px-6 bg-[#FDF6EC]">
      <LotusDivider />

      <div className="max-w-6xl mx-auto">
        <h2
          className="text-5xl text-center mb-4 text-[#1C1008] relative w-full"
          style={{ fontFamily: 'Yatra One, cursive' }}
        >
          <span className="relative inline-block">
            बहनों की बातें
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" />
          </span>
        </h2>
        <p className="text-center text-[#1C1008]/70 mb-16">
          Stories from our Shakti community
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-xl border-l-4 border-[#D4A017] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{
                animation: 'reveal 0.6s ease-out',
                animationDelay: `${index * 0.2}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="text-4xl mb-4">🪷</div>
              <p className="text-[#1C1008] mb-4 italic">
                "{item.text}"
              </p>
              <div className="pt-4 border-t border-[#D4A017]/20">
                <div className="font-medium text-[#1C1008]">{item.name}</div>
                <div className="text-sm text-[#1C1008]/60">{item.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}