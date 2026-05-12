'use client'

import { useState } from 'react'
import api from '@/lib/axios'

export default function PrivateForm({ onSubmitSuccess }) {
  const [form, setForm] = useState({
    category: '',
    urgency: 'medium',
    concern: '',
    needDoctor: false,
    allowCommunity: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.category || !form.concern.trim()) {
      setError('Please fill category and concern.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await api.post('/private/submit', form)
      setSubmitted(true)
      setForm({ category: '', urgency: 'medium', concern: '', needDoctor: false, allowCommunity: false })
      if (onSubmitSuccess) onSubmitSuccess()
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden"
      style={{ background: '#FFF8F0', border: '1px solid rgba(245,200,66,0.3)' }}
    >
      {submitted && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl z-50 p-6 text-center"
          style={{ background: 'rgba(92,31,31,0.95)' }}
        >
          <div>
            <div className="text-5xl mb-4">🌸</div>
            <h3 className="text-2xl mb-2" style={{ color: '#F5C842', fontFamily: 'Yatra One, cursive' }}>
              Prayer Received
            </h3>
            <p className="text-sm" style={{ color: 'rgba(255,248,240,0.8)' }}>
              Your concern has been safely submitted.
            </p>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,248,240,0.8)' }}>
              A trusted professional will respond within 24-48 hours.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {error && (
          <div className="px-4 py-3 rounded-xl text-sm"
            style={{ background: '#FCEBEB', color: '#791F1F', border: '1px solid #F09595' }}
          >
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-[#2C1A0E] mb-2">Category</label>
          <select value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-[#2C1A0E] text-sm outline-none"
            style={{ background: 'white', border: '1px solid rgba(232,180,184,0.4)', appearance: 'none' }}
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

        <div>
          <label className="block text-sm font-medium text-[#2C1A0E] mb-2">Urgency Level</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'low',    label: 'Low',    bg: '#2D6A4F' },
              { value: 'medium', label: 'Medium', bg: '#F5C842' },
              { value: 'high',   label: 'High',   bg: '#E8B4B8' },
            ].map((opt) => (
              <button key={opt.value} type="button"
                onClick={() => setForm({ ...form, urgency: opt.value })}
                className="py-3 rounded-xl font-medium transition-all duration-200 text-sm"
                style={{
                  background: form.urgency === opt.value ? opt.bg : 'white',
                  color: form.urgency === opt.value ? '#2C1A0E' : '#C4956A',
                  border: form.urgency === opt.value ? '2px solid #2C1A0E' : '1px solid rgba(232,180,184,0.3)',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2C1A0E] mb-2">Your Concern</label>
          <textarea value={form.concern}
            onChange={(e) => setForm({ ...form, concern: e.target.value })}
            placeholder="Share your concern here. This is a safe, confidential space."
            className="w-full px-4 py-3 rounded-xl text-[#2C1A0E] text-sm outline-none resize-none"
            style={{ background: 'white', border: '1px solid rgba(232,180,184,0.4)', minHeight: '140px', lineHeight: '1.6' }}
            required
          />
        </div>

        <div className="space-y-3">
          {[
            { key: 'needDoctor',     label: "I would like a doctor's opinion" },
            { key: 'allowCommunity', label: 'Anonymous community can see (for support)' },
          ].map((opt) => (
            <label key={opt.key} className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" checked={form[opt.key]}
                onChange={(e) => setForm({ ...form, [opt.key]: e.target.checked })}
                className="w-5 h-5 rounded mt-0.5" style={{ accentColor: '#F4A7B9' }}
              />
              <span className="text-xs sm:text-sm text-[#2C1A0E] group-hover:text-[#C4956A] transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-4 rounded-xl font-medium text-base text-[#2C1A0E] transition-all duration-300 hover:scale-105 disabled:opacity-60"
          style={{ background: loading ? '#EDE4D4' : 'linear-gradient(to right, #E8B4B8, #F4A7B9)' }}
        >
          {loading ? 'Submitting safely...' : 'Submit Safely 🔒'}
        </button>
      </form>

      <div className="mt-5 p-3 rounded-xl text-center"
        style={{ background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.2)' }}
      >
        <p className="text-xs text-[#2C1A0E]">
          🔒 End-to-end encrypted. Your identity is never shared.
        </p>
      </div>
    </div>
  )
}