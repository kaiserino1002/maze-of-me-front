<script setup lang="ts">
const emit = defineEmits(["zoomIn", "zoomOut", "reset"])
</script>

<template>
  <div class="zoom-controls">
    <button @click="emit('zoomIn')">＋</button>
    <button @click="emit('zoomOut')">－</button>
    <button @click="emit('reset')">⟳</button>
  </div>
</template>

<style scoped>
.zoom-controls {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
button {
  width: 30px;
  height: 30px;
  font-size: 18px;
  cursor: pointer;
}
</style>
