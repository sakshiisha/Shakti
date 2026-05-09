'use client'

import { useEffect, useState } from 'react'

export default function TypewriterText({ text }) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    let currentIndex = 0

    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsDone(true)
      }
    }, 80)

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(typingInterval)
      clearInterval(cursorInterval)
    }
  }, [text])

  return (
    <p className="text-lg text-[#1C1008]/80">
      {displayText}
      <span
        className="inline-block w-0.5 h-5 bg-[#1C1008] ml-1 align-middle"
        style={{ opacity: showCursor ? 1 : 0 }}
      />
    </p>
  )
}