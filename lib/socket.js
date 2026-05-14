"use client"

import { io } from "socket.io-client"

let socket = null

export const getSocket = () => {
  // client side safety check
  if (typeof window === "undefined") return null

  const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL

  if (!SOCKET_URL) {
    console.error("❌ NEXT_PUBLIC_SOCKET_URL missing")
    return null
  }

  // create socket only in browser
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    })

    socket.on("connect", () => {
      console.log("🟢 Socket connected:", socket.id)
    })

    socket.on("disconnect", (reason) => {
      console.log("🔴 Socket disconnected:", reason)
    })

    socket.on("connect_error", (err) => {
      console.error("❌ Socket error:", err.message)
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