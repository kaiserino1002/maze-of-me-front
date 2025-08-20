<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>

<template>
  <div>
    <h1>Login</h1>
    <div v-if="auth.user">
      すでにログイン済みです。<router-link to="/">ホームへ</router-link>
    </div>
    <div v-else>
      <a href="http://localhost/auth/redirect/google">Googleでログイン</a>
    </div>
  </div>
</template>