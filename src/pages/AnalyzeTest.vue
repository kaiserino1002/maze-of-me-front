<script setup lang="ts">
import { ref } from "vue"
import { analyzeText } from "@/api/analyze"

const input = ref("")
const result = ref("")

const handleAnalyze = async () => {
  try {
    const res = await analyzeText(input.value)
    result.value = JSON.stringify(res, null, 2)
  } catch (e) {
    result.value = "エラー: " + (e as any).message
  }
}
</script>

<template>
  <div>
    <h2>Analyze Test</h2>
    <input v-model="input" placeholder="テキストを入力" />
    <button @click="handleAnalyze">送信</button>
    <pre>{{ result }}</pre>
  </div>
</template>
