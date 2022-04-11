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
    meta: { checkRegister: true },
    component: LoginForm
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterForm,
    meta: { checkRegister: true, protectRegister: true }
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
