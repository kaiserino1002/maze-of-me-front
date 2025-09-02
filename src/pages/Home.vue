<script setup lang="ts">
import { useAuthStore } from "@/stores/auth"

const auth = useAuthStore()

const handleLogout = async () => {
  await auth.logout()
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Home</h1>

    <div v-if="auth.user">
      <p class="mb-2">ようこそ、{{ auth.user.name }} さん</p>
      <router-link to="/map" class="text-blue-600 underline">
        マップへ
      </router-link>
      <button
        @click="handleLogout"
        class="mt-4 py-2 px-4 bg-gray-600 rounded hover:bg-gray-700"
      >
        ログアウト
      </button>
    </div>

    <div v-else>
      <p class="mb-2">ログインしていません</p>
      <router-link to="/login">
        <button class="py-2 px-4 bg-red-600 rounded hover:bg-red-700">
          ログイン
        </button>
      </router-link>
    </div>
  </div>
</template>
