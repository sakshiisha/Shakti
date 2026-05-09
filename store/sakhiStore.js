import { create } from 'zustand'

const useSakhiStore = create((set) => ({
  // Period data
  periodData:  null,
  currentPhase: 'follicular',
  daysToNext:   null,

  // Mood
  todayMood:   null,
  moodHistory: [],

  // Private issues
  privateIssues: [],

  // Actions
  setPeriodData: (data) => set({
    periodData:   data,
    currentPhase: data?.currentPhase || 'follicular',
  }),

  setTodayMood: (mood) => set({ todayMood: mood }),

  setMoodHistory: (history) => set({ moodHistory: history }),

  setPrivateIssues: (issues) => set({ privateIssues: issues }),

  addPrivateIssue: (issue) => set((state) => ({
    privateIssues: [issue, ...state.privateIssues],
  })),

  updatePeriodPhase: (phase) => set({ currentPhase: phase }),

  setDaysToNext: (days) => set({ daysToNext: days }),
}))

export default useSakhiStore