import { create } from 'zustand'

const useSafetyStore = create((set, get) => ({
  // Location
  currentLocation: null,
  currentZone:     'safe',
  zoneData:        null,

  // Community
  communityPosts:  [],
  nearbyAlerts:    [],

  // Emergency
  isSOSActive:     false,
  lastAlertId:     null,

  // Actions
  setLocation: (location) => set({
    currentLocation: location,
  }),

  setZoneData: (zoneData) => set({
    zoneData,
    currentZone: zoneData?.status || 'safe',
  }),

  setCommunityPosts: (posts) => set({ communityPosts: posts }),

  addCommunityPost: (post) => set((state) => ({
    communityPosts: [post, ...state.communityPosts],
  })),

  markPostHelped: (postId) => set((state) => ({
    communityPosts: state.communityPosts.map((p) =>
      p._id === postId ? { ...p, helped: true } : p
    ),
  })),

  addNearbyAlert: (alert) => set((state) => ({
    nearbyAlerts: [alert, ...state.nearbyAlerts.slice(0, 4)],
  })),

  triggerSOS: (alertId) => set({
    isSOSActive: true,
    lastAlertId: alertId,
  }),

  resolveSOS: () => set({
    isSOSActive: false,
    lastAlertId: null,
  }),
}))

export default useSafetyStore