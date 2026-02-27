
import { create } from 'zustand'

interface LoadingState {
  isLoading: boolean
  message?: string
  showLoader: (msg?: string) => void
  hideLoader: () => void
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  message: undefined,
  showLoader: (message?: string) => set({ isLoading: true, message }),
  hideLoader: () => set({ isLoading: false, message: undefined }),
}))