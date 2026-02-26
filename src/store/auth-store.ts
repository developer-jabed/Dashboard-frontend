import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  id: number
  email: string
}

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean

  login: (token: string, user: User) => void
  logout: () => void
  checkAuth: () => void 
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: !!token && !!user,
        }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),

      checkAuth: () => {
        const { token, user } = get()
        set({
          isAuthenticated: !!token && !!user,
        })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
)