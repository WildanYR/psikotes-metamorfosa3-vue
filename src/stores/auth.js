import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    registerStatus: true,
    userData: {
      id: '',
      email: '',
      role: ''
    }
  }),
  actions: {
    resetState() {
      this.userData.id = ''
      this.userData.email = ''
      this.userData.role = ''
    }
  },
  persist: true
})
