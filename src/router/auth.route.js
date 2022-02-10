import LoginForm from '../views/LoginForm.vue'
import RegisterForm from '../views/RegisterForm.vue'
import VerifyEmail from '../views/VerifyEmail.vue'
import ConfirmEmail from '../views/ConfirmEmail.vue'

export default [
  {
    name: 'login',
    path: '/login',
    component: LoginForm
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterForm
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
