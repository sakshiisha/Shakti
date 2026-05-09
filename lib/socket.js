import { io } from 'socket.io-client'

let socket = null

export const getSocket = () => {
  if (!socket) {
    socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000',
      {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      }
    )

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err)
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