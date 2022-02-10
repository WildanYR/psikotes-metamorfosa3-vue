<script setup>
import FormInput from '../components/FormInput.vue'
import FormInputPassword from '../components/FormInputPassword.vue'
import PsiButton from '../components/PsiButton.vue'
</script>

<template>
  <h1 class="mb-6 text-center text-4xl font-medium">Login</h1>
  <div class="space-y-4">
    <form-input label="Email"></form-input>
    <div>
      <form-input-password label="Kata Sandi"></form-input-password>
      <router-link
        to="/"
        class="ml-1 text-sm text-blue-800 hover:text-blue-700"
      >
        Lupa kata sandi?
      </router-link>
    </div>
    <psi-button class="w-full" :loading="false">Login</psi-button>
    <div class="text-center">
      <router-link
        :to="{ name: 'register' }"
        class="text-blue-800 hover:text-blue-700"
      >
        Belum punya akun?
      </router-link>
    </div>
  </div>
</template>
