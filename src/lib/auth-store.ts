import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean
  adminEmail: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => void
}

// Simple admin check - in production, use proper Supabase Auth
const ADMIN_EMAIL = 'admin@portfolio.com'
const ADMIN_PASSWORD = 'portfolio2024' // Change this!

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      adminEmail: null,

      login: async (email: string, password: string) => {
        // Check credentials
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          set({ isAuthenticated: true, adminEmail: email })
          return true
        }
        return false
      },

      logout: () => {
        set({ isAuthenticated: false, adminEmail: null })
      },

      checkAuth: () => {
        const state = get()
        if (!state.isAuthenticated) {
          // Check sessionStorage for session
          const session = sessionStorage.getItem('admin-session')
          if (session) {
            set({ isAuthenticated: true, adminEmail: ADMIN_EMAIL })
          }
        }
      }
    }),
    {
      name: 'admin-auth',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated, adminEmail: state.adminEmail })
    }
  )
)