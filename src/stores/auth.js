import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    registerStatus: true,
    userData: {
      id: '',
      email: ''
    }
  }),
  actions: {
    setUserData(id, email) {
      this.userData.id = id
      this.userData.email = email
    }
  },
  persist: true
})
