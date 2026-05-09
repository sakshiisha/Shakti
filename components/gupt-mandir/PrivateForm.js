'use client'

import { useState } from 'react'

export default function PrivateForm() {
  const [form, setForm] = useState({
    category: '',
    urgency: 'medium',
    concern: '',
    needDoctor: false,
    allowCommunity: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ category: '', urgency: 'medium', concern: '', needDoctor: false, allowCommunity: false })
    }, 4000)
  }

  return (
    <div className="rounded-2xl p-8 relative overflow-hidden"
      style={{
        background: '#FFF8F0',
        border: '1px solid rgba(245,200,66,0.3)',
        boxShadow: '0 8px 32px rgba(196,149,106,0.15)'
      }}
    >
      {/* Submitted overlay */}
      {submitted && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl z-50"
          style={{ background: 'rgba(92,31,31,0.95)' }}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🌸</div>
            <h3 className="text-3xl mb-2"
              style={{ color: '#F5C842', fontFamily: 'Yatra One, cursive' }}
            >
              Prayer Received
            </h3>
            <p className="text-sm" style={{ color: 'rgba(255,248,240,0.8)' }}>
              Your concern has been safely submitted.
            </p>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,248,240,0.8)' }}>
              A trusted professional will respond within 24-48 hours.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-[#2C1A0E] mb-2">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-[#2C1A0E] text-sm outline-none"
            style={{
              background: 'white',
              border: '1px solid rgba(232,180,184,0.4)',
              appearance: 'none'
            }}
            required
          >
            <option value="">Select a category</option>
            <option value="menstrual">Menstrual Health</option>
            <option value="reproductive">Reproductive Health</option>
            <option value="intimacy">Intimacy & Relationships</option>
            <option value="mental">Mental Health</option>
            <option value="contraception">Contraception</option>
            <option value="infections">Infections & STIs</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-sm font-medium text-[#2C1A0E] mb-2">
            Urgency Level
          </label>
          <div className="flex gap-3">
            {[
              { value: 'low',    label: 'Low',    bg: '#2D6A4F' },
              { value: 'medium', label: 'Medium', bg: '#F5C842' },
              { value: 'high',   label: 'High',   bg: '#E8B4B8' },
            ].map((opt) => (
              <button key={opt.value} type="button"
                onClick={() => setForm({ ...form, urgency: opt.value })}
                className="flex-1 py-3 rounded-xl font-medium transition-all duration-200"
                style={{
                  background: form.urgency === opt.value ? opt.bg : 'white',
                  color: form.urgency === opt.value ? '#2C1A0E' : '#C4956A',
                  border: form.urgency === opt.value
                    ? `2px solid #2C1A0E`
                    : '1px solid rgba(232,180,184,0.3)',
                  transform: form.urgency === opt.value ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Concern */}
        <div>
          <label className="block text-sm font-medium text-[#2C1A0E] mb-2">
            Your Concern
          </label>
          <textarea
            value={form.concern}
            onChange={(e) => setForm({ ...form, concern: e.target.value })}
            placeholder="Share your concern here. This is a safe, confidential space."
            className="w-full px-4 py-3 rounded-xl text-[#2C1A0E] text-sm outline-none resize-none"
            style={{
              background: 'white',
              border: '1px solid rgba(232,180,184,0.4)',
              minHeight: '150px',
              lineHeight: '1.6'
            }}
            onFocus={(e) => e.target.style.borderColor = '#F4A7B9'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(232,180,184,0.4)'}
            required
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          {[
            { key: 'needDoctor',     label: "I would like a doctor's opinion"        },
            { key: 'allowCommunity', label: 'Anonymous community can see (for support)' },
          ].map((opt) => (
            <label key={opt.key}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input type="checkbox"
                checked={form[opt.key]}
                onChange={(e) => setForm({ ...form, [opt.key]: e.target.checked })}
                className="w-5 h-5 rounded"
                style={{ accentColor: '#F4A7B9' }}
              />
              <span className="text-sm text-[#2C1A0E] group-hover:text-[#C4956A] transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>

        {/* Submit */}
        <button type="submit"
          className="w-full py-4 rounded-xl font-medium text-lg text-[#2C1A0E] transition-all duration-300 hover:scale-105 hover:shadow-xl"
          style={{ background: 'linear-gradient(to right, #E8B4B8, #F4A7B9)' }}
        >
          Submit Safely 🔒
        </button>
      </form>

      {/* Privacy note */}
      <div className="mt-6 p-4 rounded-xl text-center"
        style={{ background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.2)' }}
      >
        <p className="text-xs text-[#2C1A0E]">
          🔒 End-to-end encrypted. Your identity is never shared.
          Responses are private unless you choose community visibility.
        </p>
      </div>
    </div>
  )
}