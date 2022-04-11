<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import FormInput from '../components/FormInput.vue'
import PsiButton from '../components/PsiButton.vue'
import { login } from '../services/authService'
import { useAuthStore } from '../stores/auth'
import FromValidator from '../helpers/formValidation'

const router = useRouter()
const authStore = useAuthStore()
const loadingLogin = ref(false)
const formData = reactive({
  email: '',
  password: ''
})
const formDataValidate = reactive({
  email: [],
  password: []
})
const handleLogin = () => {
  formDataValidate.email = new FromValidator(formData.email)
    .isRequired()
    .isEmail()
  formDataValidate.password = new FromValidator(formData.password)
    .isRequired()
    .min(8)
  if (formDataValidate.email.invalid || formDataValidate.password.invalid) {
    return
  }
  loadingLogin.value = true
  login(formData.email, formData.password)
    .then((data) => {
      authStore.setUserData(
        data.peserta.id,
        data.peserta.email,
        data.peserta.role
      )
      if (data.peserta.role === 'admin') {
        router.push({ name: 'sesi_admin' })
      } else {
        router.push({ name: 'dashboard_peserta' })
      }
    })
    .finally(() => {
      loadingLogin.value = false
    })
}
</script>

<template>
  <h1 class="mb-6 text-center text-4xl font-medium">Login</h1>
  <div class="space-y-4">
    <form-input
      v-model="formData.email"
      label="Email"
      :error-message="formDataValidate.email.errorMessage"
    ></form-input>
    <div>
      <form-input
        v-model="formData.password"
        type="password"
        label="Kata Sandi"
        :error-message="formDataValidate.password.errorMessage"
        @keyup.enter="handleLogin"
      ></form-input>
      <router-link
        to="/"
        class="ml-1 text-sm text-blue-800 hover:text-blue-700"
      >
        Lupa kata sandi?
      </router-link>
    </div>
    <psi-button class="w-full" :loading="loadingLogin" @click="handleLogin"
      >Login</psi-button
    >
    <div v-if="authStore.registerStatus" class="text-center">
      <router-link
        :to="{ name: 'register' }"
        class="text-blue-800 hover:text-blue-700"
      >
        Belum punya akun?
      </router-link>
    </div>
  </div>
</template>
