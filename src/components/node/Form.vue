<script setup lang="ts">
import { ref } from "vue"

const text = ref("")

const emit = defineEmits(["saved"])

function saveNode() {
  if (!text.value.trim()) return
  const node = {
    id: Date.now(),
    text: text.value,
    created_at: new Date().toISOString(),
  }
  emit("saved", node)
  text.value = ""
}
</script>

<template>
  <div class="form">
    <input v-model="text" placeholder="ノードを入力..." />
    <button @click="saveNode">追加</button>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  gap: 10px;
}
input {
  flex: 1;
  padding: 6px;
}
button {
  padding: 6px 12px;
}
</style>
