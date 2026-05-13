import Link from 'next/link'
import LotusDivider from '@/components/landing/LotusDivider'

const steps = [
  {
    num: '01',
    emoji: '🛡',
    titleEn: 'Stay Safe — Abhaya',
    titleHi: 'सुरक्षित रहें — अभया',
    descEn: 'Open the app and your GPS location is checked in real time. If you are in a safe area with women nearby, the map shows green. If you are alone or in an unsafe area, it turns red and alerts you immediately. Press SOS once — your emergency contact gets your live location instantly.',
    descHi: 'App खोलते ही आपकी GPS location real time में check होती है। अगर आस-पास महिलाएं हैं तो map हरा दिखता है। अकेली हैं या unsafe area में हैं तो लाल हो जाता है। एक बार SOS दबाएं — आपके emergency contact को तुरंत location मिल जाती है।',
    color: '#2D6A4F',
    bg: 'rgba(45,106,79,0.06)',
    border: 'rgba(45,106,79,0.2)',
  },
  {
    num: '02',
    emoji: '🌸',
    titleEn: 'Track Your Wellness — Sakhi',
    titleHi: 'अपना स्वास्थ्य समझें — सखी',
    descEn: 'Track your monthly cycle and understand each phase — menstrual, follicular, ovulation, and luteal. Check in with your mood daily. Get personalized Ayurvedic home remedies based on your current phase. No judgment, no data sharing with anyone.',
    descHi: 'अपने मासिक चक्र को track करें और हर phase समझें। हर दिन अपना mood check-in करें। अपने current phase के अनुसार personalized Ayurvedic घरेलू नुस्खे पाएं। कोई judgment नहीं, किसी से data share नहीं।',
    color: '#C4956A',
    bg: 'rgba(196,149,106,0.06)',
    border: 'rgba(196,149,106,0.2)',
  },
  {
    num: '03',
    emoji: '🔒',
    titleEn: 'Private Space — Gupt Mandir',
    titleHi: 'निजी जगह — गुप्त मंदिर',
    descEn: 'Share your health concerns privately — menstrual issues, mental health, relationships, or anything you cannot say out loud. Your concern is encrypted and only reviewed by verified professionals. You get a personal response within 24-48 hours. Your identity is never revealed.',
    descHi: 'अपनी स्वास्थ्य समस्याएं निजी तौर पर share करें — मासिक धर्म, मानसिक स्वास्थ्य, रिश्ते, या जो बात आप ज़ोर से नहीं कह सकतीं। आपकी बात encrypted है और केवल verified professionals देखते हैं। 24-48 घंटे में personal जवाब मिलता है। आपकी पहचान कभी सामने नहीं आती।',
    color: '#5C1F1F',
    bg: 'rgba(92,31,31,0.06)',
    border: 'rgba(92,31,31,0.2)',
  },
]

const faqs = [
  {
    q: 'Is my data safe? / क्या मेरा data safe है?',
    a: 'Yes — all private concerns are encrypted before saving. Your name and identity are never attached to any public data. / हां — सभी private concerns save होने से पहले encrypted हो जाती हैं। आपका नाम या पहचान कभी public नहीं होती।',
  },
  {
    q: 'Does SOS actually work? / क्या SOS सच में काम करता है?',
    a: 'Yes — pressing SOS sends your live GPS location to your registered emergency contact instantly. For police, use the direct 112 call button shown on the screen. / हां — SOS दबाने पर आपकी live GPS location तुरंत registered emergency contact को जाती है। Police के लिए screen पर दिखने वाला 112 call button use करें।',
  },
  {
    q: 'Who reviews Gupt Mandir concerns? / Gupt Mandir में कौन जवाब देता है?',
    a: 'Verified admin team and health professionals review and respond to every concern privately. / Verified admin team और health professionals हर concern को privately review करके जवाब देते हैं।',
  },
  {
    q: 'Is the app free? / क्या app free है?',
    a: 'Yes — SHAKTI is completely free to use. No hidden charges, no subscriptions. / हां — SHAKTI पूरी तरह free है। कोई hidden charge नहीं, कोई subscription नहीं।',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen" style={{ background: '#FDF6EC' }}>

      {/* Simple back nav */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-2">
        <Link href="/"
          className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-70"
          style={{ color: '#C4956A' }}
        >
          ← Back to home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="text-4xl mb-4">ॐ</div>
          <h1 className="text-4xl sm:text-5xl text-[#1C1008] mb-3"
            style={{ fontFamily: 'Yatra One, cursive' }}
          >
            How SHAKTI Works
          </h1>
          <p className="text-base sm:text-lg mb-1" style={{ color: '#C4956A' }}>
            Simple, safe, and completely free for every woman.
          </p>
          <p className="text-sm" style={{ color: '#C4956A', opacity: 0.8 }}>
            हर महिला के लिए — सरल, सुरक्षित, और बिल्कुल मुफ़्त।
          </p>
        </div>

        {/* 3 Steps */}
        <div className="space-y-6 mb-14">
          {steps.map((step) => (
            <div key={step.num}
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: step.bg, border: `1px solid ${step.border}` }}
            >
              <div className="flex items-start gap-4 sm:gap-6">

                {/* Number + emoji */}
                <div className="flex-shrink-0 text-center">
                  <div className="text-3xl mb-1">{step.emoji}</div>
                  <div className="text-xs font-medium" style={{ color: step.color, opacity: 0.6 }}>
                    {step.num}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl text-[#1C1008] mb-1"
                    style={{ fontFamily: 'Yatra One, cursive' }}
                  >
                    {step.titleEn}
                  </h2>
                  <p className="text-sm mb-1" style={{ color: step.color, opacity: 0.8 }}>
                    {step.titleHi}
                  </p>
                  <div className="mt-4 space-y-3">
                    <p className="text-sm leading-relaxed text-[#1C1008]">
                      {step.descEn}
                    </p>
                    <p className="text-sm leading-relaxed"
                      style={{ color: step.color, opacity: 0.85 }}
                    >
                      {step.descHi}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <LotusDivider />

        {/* FAQ */}
        <div className="mb-14">
          <h2 className="text-3xl text-[#1C1008] text-center mb-8"
            style={{ fontFamily: 'Yatra One, cursive' }}
          >
            Common Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl p-5 sm:p-6"
                style={{ background: 'white', border: '1px solid rgba(212,160,23,0.2)' }}
              >
                <p className="text-sm font-medium text-[#1C1008] mb-3">
                  {faq.q}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#6B5D4F' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        <LotusDivider />

        {/* CTA */}
        <div className="text-center py-8">
          <p className="text-lg text-[#1C1008] mb-2"
            style={{ fontFamily: 'Yatra One, cursive' }}
          >
            Ready to join SHAKTI?
          </p>
          <p className="text-sm mb-6" style={{ color: '#C4956A' }}>
            हज़ारों महिलाएं पहले से SHAKTI family का हिस्सा हैं।
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register"
              className="px-8 py-3 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
              style={{ background: '#F97316' }}
            >
              Get Started — Free
            </Link>
            <Link href="/"
              className="px-8 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105"
              style={{ border: '1px solid #7C1D1D', color: '#7C1D1D' }}
            >
              Back to Home
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}