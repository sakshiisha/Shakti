import Link from 'next/link'
import LotusDivider from '@/components/landing/LotusDivider'

const steps = [
  {
    num: '01',
    emoji: '🛡',
    titleEn: 'Stay Safe — Abhaya',
    descEn: `Open the app and your GPS location is checked in real time. 
If you are in a safe area with women nearby, the map shows green. 
If you are alone or in an unsafe area, it turns red and alerts you immediately.

You can also send a quick anonymous safety message to women near you. 
If someone around you feels unsafe, their alert appears in your app too — 
so women nearby can stay aware and help each other.

Press SOS once and your emergency contact receives your live location instantly.`,
    color: '#2D6A4F',
    bg: 'rgba(45,106,79,0.06)',
    border: 'rgba(45,106,79,0.2)',
  },
  {
    num: '02',
    emoji: '👭',
    titleEn: 'Find Nearby Sisters — Peer Support',
    descEn: `If you ever feel uncomfortable, stranded, or need help, you can create a quick safety post. 
Nearby women using SHAKTI can see your request and offer help.

From walking together to waiting until you reach home safely — you are never alone.`,
    color: '#C4956A',
    bg: 'rgba(196,149,106,0.06)',
    border: 'rgba(196,149,106,0.2)',
  },
  {
    num: '03',
    emoji: '🌸',
    titleEn: 'Track Your Wellness — Sakhi',
    descEn: `Track your monthly cycle and understand each phase — menstrual, follicular, ovulation, and luteal. 
Check in with your mood daily and understand how your body feels each day. 
Get simple Ayurvedic home remedies based on your current phase. 
No judgment. No data sharing.`,
    color: '#E38B6C',
    bg: 'rgba(227,139,108,0.06)',
    border: 'rgba(227,139,108,0.2)',
  },
  {
    num: '04',
    emoji: '🔒',
    titleEn: 'Private Space — Gupt Mandir',
    descEn: `Share your health concerns privately — menstrual issues, mental health, relationships, or anything you cannot say out loud. 
Your message is encrypted and only reviewed by verified professionals. 
You receive a personal response within 24–48 hours. Your identity always stays hidden.`,
    color: '#5C1F1F',
    bg: 'rgba(92,31,31,0.06)',
    border: 'rgba(92,31,31,0.2)',
  },
]

const faqs = [
  {
    q: 'Is my data safe?',
    a: 'Yes — all private concerns are encrypted before saving. Your name and identity are never attached to any public data.',
  },
  {
    q: 'Does SOS actually work?',
    a: 'Yes — pressing SOS sends your live GPS location to your emergency contact instantly. You can also call 112 directly from the app.',
  },
  {
    q: 'Can women nearby see my alert?',
    a: 'Yes — if you share a nearby safety message, women in your area receive an anonymous alert so they can stay aware and respond.',
  },
  {
    q: 'Is the app free?',
    a: 'Yes — SHAKTI is completely free. No hidden charges or subscriptions.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen" style={{ background: '#FDF6EC' }}>
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-2">
        <Link href="/" className="text-sm" style={{ color: '#C4956A' }}>
          ← Back to home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">

        <div className="text-center mb-14">
          <div className="text-4xl mb-4">ॐ</div>
          <h1 className="text-4xl text-[#1C1008] mb-3"
            style={{ fontFamily: 'Yatra One, cursive' }}>
            How SHAKTI Works
          </h1>
          <p style={{ color: '#C4956A' }}>
            Simple, safe, and completely free for every woman.
          </p>
        </div>

        <div className="space-y-6 mb-14">
          {steps.map((step) => (
            <div key={step.num}
              className="rounded-2xl p-6"
              style={{ background: step.bg, border: `1px solid ${step.border}` }}>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-3xl">{step.emoji}</div>
                  <div className="text-xs" style={{ color: step.color }}>{step.num}</div>
                </div>

                <div>
                  <h2 className="text-xl text-[#1C1008]"
                    style={{ fontFamily: 'Yatra One, cursive' }}>
                    {step.titleEn}
                  </h2>
                  <p className="text-sm mt-3">{step.descEn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <LotusDivider />

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl p-5 bg-white">
              <p className="font-medium mb-2">{faq.q}</p>
              <p className="text-sm">{faq.a}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}