importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js')

// Yahan apni new key daalo
firebase.initializeApp({
  apiKey:            'AIzaSyBigJA3_4zxeGDh2Jk8WPQ8agJmNXg5dIo',
  authDomain:        'bhakti-437fc.firebaseapp.com',
  projectId:         'bhakti-437fc',
  storageBucket:     'bhakti-437fc.firebasestorage.app',
  messagingSenderId: '736011864641',
  appId:             '1:736011864641:web:5117c0d64d5ad7f40814c0',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {}
  self.registration.showNotification(title || '🆘 SHAKTI Alert', {
    body:               body || 'Emergency alert!',
    icon:               '/icon-192.png',
    badge:              '/icon-192.png',
    tag:                'shakti-alert',
    requireInteraction: true,
    data:               payload.data || {},
  })
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(clients.openWindow('/abhaya'))
})