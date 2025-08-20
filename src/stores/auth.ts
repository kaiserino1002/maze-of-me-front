import { defineStore } from 'pinia'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { id: number; name: string },
    isLoading: true,
  }),
  actions: {
    async fetchUser() {
      this.isLoading = true
      try {
        const res = await api.get('/api/user')
        this.user = res.data
      } catch {
        this.user = null
      } finally {
        this.isLoading = false
      }
    },
    async logout() {
      await api.post('/api/logout')
      this.user = null
    }
  },
})
