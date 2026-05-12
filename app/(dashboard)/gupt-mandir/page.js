'use client'

import { useEffect, useState } from 'react'
import api           from '@/lib/axios'
import GuptHero      from '@/components/gupt-mandir/GuptHero'
import PrivateForm   from '@/components/gupt-mandir/PrivateForm'
import ResponseCard from '@/components/gupt-mandir/PastResponses'
import ResourceLinks from '@/components/gupt-mandir/ResourceLinks'

export default function GuptMandirPage() {
  const [issues,  setIssues]  = useState([])
  const [loading, setLoading] = useState(true)
  const [tab,     setTab]     = useState('submit')

  const fetchIssues = async () => {
    try {
      const { data } = await api.get('/private/mine')
      setIssues(data.issues || [])
    } catch (err) {
      console.error('Issues fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchIssues() }, [])

  return (
    <div className="min-h-screen" style={{ background: '#FFF8F0' }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">

        <GuptHero />

        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-1 rounded-2xl"
          style={{ background: 'rgba(92,31,31,0.08)' }}
        >
          {[
            { id: 'submit',    label: 'Submit Concern' },
            { id: 'responses', label: `My Responses (${issues.length})` },
            { id: 'resources', label: 'Resources' },
          ].map((t) => (
            <button key={t.id}
              onClick={() => setTab(t.id)}
              className="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200"
              style={{
                background: tab === t.id ? 'white' : 'transparent',
                color: tab === t.id ? '#2C1A0E' : '#C4956A',
                boxShadow: tab === t.id ? '0 2px 8px rgba(92,31,31,0.1)' : 'none',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Submit tab */}
        {tab === 'submit' && (
          <PrivateForm onSubmitSuccess={() => { fetchIssues(); setTab('responses') }} />
        )}

        {/* Responses tab */}
        {tab === 'responses' && (
          <div>
            {loading ? (
              <div className="text-center py-10" style={{ color: '#C4956A' }}>
                <div className="text-3xl mb-2">🔒</div>
                <p>Loading your responses...</p>
              </div>
            ) : issues.length === 0 ? (
              <div className="text-center py-10 rounded-2xl"
                style={{ background: 'white', border: '1px solid rgba(212,160,23,0.2)' }}
              >
                <div className="text-3xl mb-2">🌸</div>
                <p className="text-sm" style={{ color: '#C4956A' }}>
                  No concerns yet. Submit your first concern.
                </p>
                <button onClick={() => setTab('submit')}
                  className="mt-4 px-6 py-2 rounded-xl text-sm text-[#2C1A0E]"
                  style={{ background: 'linear-gradient(to right, #E8B4B8, #F4A7B9)' }}
                >
                  Submit Concern →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {issues.map((issue) => (
                  <ResponseCard
                    key={issue._id}
                    concern={issue.concern || 'Your concern'}
                    reply={issue.response?.text || ''}
                    status={issue.status}
                    date={new Date(issue.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Resources tab */}
        {tab === 'resources' && <ResourceLinks />}

      </div>
    </div>
  )
}