import { defineStore } from "pinia"
import { getUser, loginWithGoogle, logout } from "@/utilities/auth"

export interface AuthUser {
  id: number
  name: string
  email: string
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as AuthUser | null,
  }),
  actions: {
    async fetchUser() {
      try {
        const user = await getUser()
        this.user = user
      } catch (e) {
        this.user = null
      }
    },
    async login() {
      const user = await loginWithGoogle()
      this.user = user
      // ログイン後は /map に遷移
      window.location.href = "/map"
    },
    async logout() {
      await logout()
      this.user = null
    },
    setUser(user: AuthUser) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
  },
})
