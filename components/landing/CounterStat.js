'use client'

import { useEffect, useState, useRef } from 'react'

export default function CounterStat({ end, label, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let startTime
    const duration = 2000
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isVisible, end])

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-4xl text-[#D4A017] mb-2"
        style={{ fontFamily: 'Yatra One, cursive' }}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-[#FDF6EC]/90">{label}</div>
    </div>
  )
}