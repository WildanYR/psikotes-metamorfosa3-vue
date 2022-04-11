const LoginForm = () => import('../views/LoginForm.vue')
const RegisterForm = () => import('../views/RegisterForm.vue')
const VerifyEmail = () => import('../views/VerifyEmail.vue')
const ConfirmEmail = () => import('../views/ConfirmEmail.vue')

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
