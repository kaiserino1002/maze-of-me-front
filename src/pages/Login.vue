<script setup lang="ts">
import { useAuthStore } from "@/stores/auth"
import { loginWithGoogle, logout } from "@/utilities/auth"

const auth = useAuthStore()

async function handleLogin() {
  const user = await loginWithGoogle()
  if (user) {
    auth.setUser(user) // Pinia ストアに反映
  }
}

async function handleLogout() {
  await logout()
  auth.clearUser()
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Login</h1>

    <!-- ログイン済み -->
    <div v-if="auth.user">
      <p class="mb-2">こんにちは、{{ auth.user.name }} さん</p>
      <router-link to="/" class="text-blue-600 underline">ホームへ</router-link>
      <button
        @click="handleLogout"
        class="mt-4 w-full py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        ログアウト
      </button>
    </div>

    <!-- 未ログイン -->
    <div v-else>
      <button
        @click="handleLogin"
        class="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Googleでログイン
      </button>
    </div>
  </div>
</template>
