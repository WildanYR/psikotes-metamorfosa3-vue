import LoginForm from '../views/LoginForm.vue'
import RegisterForm from '../views/RegisterForm.vue'
import VerifyEmail from '../views/VerifyEmail.vue'
import ConfirmEmail from '../views/ConfirmEmail.vue'
import { registerStatus } from '../services/authService'
import { useAuthStore } from '../stores/auth'
import { useLoadingStore } from '../stores/loading'

const checkRegisterStatus = async () => {
  try {
    const status = await registerStatus()
    return status.registerStatus
  } catch (error) {
    return false
  }
}

export default [
  {
    name: 'login',
    path: '/login',
    component: LoginForm,
    beforeEnter: async () => {
      const loadingStore = useLoadingStore()
      const authStore = useAuthStore()
      loadingStore.global = true
      const registerStatus = await checkRegisterStatus()
      authStore.registerStatus = registerStatus
      loadingStore.global = false
      return true
    }
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterForm,
    beforeEnter: async () => {
      const loadingStore = useLoadingStore()
      const authStore = useAuthStore()
      loadingStore.global = true
      const registerStatus = await checkRegisterStatus()
      authStore.registerStatus = registerStatus
      loadingStore.global = false
      if (!registerStatus) {
        return { name: 'login' }
      }
      return true
    }
  },
  {
    name: 'verify_email',
    path: '/verify-email',
    component: VerifyEmail
  },
  {
    name: 'confirm_email',
    path: '/confirm-email',
    component: ConfirmEmail
  }
]
