<script setup>
import FormInput from '../components/FormInput.vue'
import FormInputPassword from '../components/FormInputPassword.vue'
import PsiButton from '../components/PsiButton.vue'
import FormRadio from '../components/FormRadio.vue'

const jenis_kelamin = [
  {
    text: 'Laki-laki',
    value: 'laki-laki'
  },
  {
    text: 'Perempuan',
    value: 'perempuan'
  }
]
</script>

<template>
  <h1 class="mb-6 text-center text-4xl font-medium">Daftar Akun</h1>
  <div>
    <h2 class="mb-3 text-lg font-medium text-gray-500">Akun</h2>
    <div class="space-y-4">
      <form-input label="Email"></form-input>
      <form-input-password label="Kata Sandi"></form-input-password>
    </div>
    <h2 class="mt-6 mb-3 text-lg font-medium text-gray-500">Data Diri</h2>
    <div class="space-y-4">
      <form-input label="Nama Lengkap"></form-input>
      <form-input label="Tempat tanggal lahir"></form-input>
      <form-radio label="Jenis Kelamin" :radio-options="jenis_kelamin" />
      <form-input label="Alamat"></form-input>
      <form-input label="Agama"></form-input>
      <form-input label="Pendidikan terakhir"></form-input>
    </div>
    <div class="mt-6 space-y-4">
      <psi-button class="w-full" :loading="false">Daftar</psi-button>
      <div class="text-center">
        <router-link
          :to="{ name: 'login' }"
          class="text-blue-800 hover:text-blue-700"
        >
          Sudah punya akun?
        </router-link>
      </div>
    </div>
  </div>
</template>
