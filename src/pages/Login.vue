<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const redirectToGoogle = () => {
  window.location.href = 'http://localhost/api/auth/redirect/google'
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Login</h1>
    <div v-if="auth.user">
      すでにログイン済みです。
      <router-link to="/" class="text-blue-600 underline">ホームへ</router-link>
    </div>
    <div v-else>
      <button
        @click="redirectToGoogle"
        class="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Googleでログイン
      </button>
    </div>
  </div>
</template>


