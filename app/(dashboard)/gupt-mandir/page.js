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
      <div className="max-w-4xl mx-auto px-6 py-10">

        <GuptHero />

        <div className="mb-8">
          <h2 className="text-2xl text-[#2C1A0E] mb-4"
            style={{ fontFamily: 'Yatra One, cursive' }}
          >
            Share Your Concern
          </h2>
          <PrivateForm onSubmitSuccess={fetchIssues} />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl text-[#2C1A0E] mb-4"
            style={{ fontFamily: 'Yatra One, cursive' }}
          >
            Previous Responses
          </h2>

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
                No concerns submitted yet.
              </p>
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

        <ResourceLinks />

      </div>
    </div>
  )
}