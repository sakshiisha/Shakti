import { initializeApp, getApps } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const getFirebaseMessaging = () => {
  if (typeof window === 'undefined') return null
  try { return getMessaging(app) } catch { return null }
}

export const requestNotificationPermission = async () => {
  try {
    // HTTPS check — localhost pe FCM kaam nahi karta
    if (typeof window === 'undefined') return null
    if (!('serviceWorker' in navigator)) return null
    if (!('Notification' in window)) return null

    const messaging = getFirebaseMessaging()
    if (!messaging) return null

    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return null

    // VAPID key nahi hai toh skip
    if (!process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY) {
      console.log('[FCM] VAPID key missing — skipping token')
      return null
    }

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    })
    return token
  } catch (err) {
    // Silently fail — FCM optional hai, SOS kaam karega
    console.log('[FCM] Skipped:', err.message)
    return null
  }
}

export const onForegroundMessage = (callback) => {
  const messaging = getFirebaseMessaging()
  if (!messaging) return () => {}
  return onMessage(messaging, callback)
}

export default app