import { io } from 'socket.io-client'

let _socket = null

export const getSocket = () => {
  if (!_socket) {
    _socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000', {
      transports:           ['websocket'],
      reconnection:         true,
      reconnectionAttempts: 10,
      reconnectionDelay:    1000,
      reconnectionDelayMax: 5000,
    })

    _socket.on('connect',       () => console.log('[Socket] connected:', _socket.id))
    _socket.on('disconnect',    () => console.log('[Socket] disconnected'))
    _socket.on('connect_error', (e) => console.error('[Socket] error:', e.message))
  }
  return _socket
}

export const disconnectSocket = () => {
  if (_socket) { _socket.disconnect(); _socket = null }
}

export default getSocket