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
    },
    setUserData(id, email, role) {
      this.userData.id = id
      this.userData.email = email
      this.userData.role = role
    }
  },
  persist: true
})
