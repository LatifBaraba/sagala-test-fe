import { create } from 'zustand'

export const useStoreSidebar = create((set) => ({
  active: true,
  setActive: () => set((state) => ({ active: !state.active })),
}))