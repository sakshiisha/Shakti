'use client'

import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

export default function useSocket() {
  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000'
    )

    return () => {
      if (socketRef.current) socketRef.current.disconnect()
    }
  }, [])

  return socketRef.current
}