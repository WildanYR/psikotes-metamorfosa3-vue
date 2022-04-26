<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 md:px-0"
  >
    <img
      loading="lazy"
      src="../assets/logo.png"
      alt="logo ppt metamorfosa"
      class="pointer-events-none mt-12 w-64 sm:w-80"
    />
    <div class="mb-24 mt-14 w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
      <router-view></router-view>
    </div>
  </div>
</template>
