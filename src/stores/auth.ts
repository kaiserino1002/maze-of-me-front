import { defineStore } from 'pinia'
import axios from "axios"

interface User {
  id: number
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isLoading: false,
  }),
  actions: {
    async fetchUser() {
      const res = await axios.get("/api/user")
      this.user = res.data
    },
    setUser(user: User) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
  },
})
