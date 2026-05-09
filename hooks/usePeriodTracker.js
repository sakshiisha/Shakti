'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/axios'

export default function usePeriodTracker() {
  const [periodData, setPeriodData] = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)

  // Fetch period data
  const fetchData = async () => {
    try {
      const { data } = await api.get('/period')
      setPeriodData(data.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  // Update period data
  const updatePeriod = async (formData) => {
    try {
      const { data } = await api.put('/period/update', formData)
      setPeriodData(data.data)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  // Log mood
  const logMood = async (mood, note = '') => {
    try {
      await api.post('/mood', { mood, note })
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  // Calculate current phase
  const getCurrentPhase = () => {
    if (!periodData?.currentDay) return 'follicular'
    const day = periodData.currentDay
    if (day <= 5)  return 'menstrual'
    if (day <= 13) return 'follicular'
    if (day <= 16) return 'ovulation'
    return 'luteal'
  }

  // Days to next period
  const getDaysToNext = () => {
    if (!periodData?.nextPeriodDate) return null
    const diff = new Date(periodData.nextPeriodDate) - new Date()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  return {
    periodData,
    loading,
    error,
    updatePeriod,
    logMood,
    currentPhase: getCurrentPhase(),
    daysToNext:   getDaysToNext(),
    refetch:      fetchData,
  }
}