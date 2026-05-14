import { io } from 'socket.io-client'

let socket = null

export const getSocket = () => {
  // 🔴 IMPORTANT: deploy ke liye URL required
  const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL

  if (!SOCKET_URL) {
    console.error('❌ NEXT_PUBLIC_SOCKET_URL missing in env')
    return null
  }

  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket'],
      withCredentials: true,

      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    })

    socket.on('connect', () => {
      console.log('🟢 Socket connected:', socket.id)
    })

    socket.on('disconnect', (reason) => {
      console.log('🔴 Socket disconnected:', reason)
    })

    socket.on('connect_error', (err) => {
      console.error('❌ Socket connection error:', err.message)
    })
  }

  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export default getSocket