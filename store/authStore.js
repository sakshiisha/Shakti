import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('shakti_user') || 'null')
    : null,

  isLoggedIn: typeof window !== 'undefined'
    ? !!localStorage.getItem('shakti_token')
    : false,

  token: typeof window !== 'undefined'
    ? localStorage.getItem('shakti_token') || null
    : null,

  setUser: (user, token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shakti_user', JSON.stringify(user))
      localStorage.setItem('shakti_token', token)
    }
    set({ user, token, isLoggedIn: true })
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('shakti_user')
      localStorage.removeItem('shakti_token')
    }
    set({ user: null, token: null, isLoggedIn: false })
  },

  updateUser: (data) => set((state) => {
    const updated = { ...state.user, ...data }
    if (typeof window !== 'undefined') {
      localStorage.setItem('shakti_user', JSON.stringify(updated))
    }
    return { user: updated }
  }),
}))

export default useAuthStore