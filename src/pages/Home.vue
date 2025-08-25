<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()

const handleLogout = async () => {
  await auth.logout()
}
</script>

<template>
  <div>
    <h1>Home</h1>

    <div v-if="auth.user">
      ようこそ、{{ auth.user.name }} さん
      <button @click="handleLogout">ログアウト</button>
    </div>

    <div v-else>
      ログインしていません
      <router-link to="/login">
        <button>ログイン</button>
      </router-link>
    </div>
  </div>
</template>