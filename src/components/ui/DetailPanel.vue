<script setup lang="ts">
import { defineProps } from "vue"
const { node, onClose } = defineProps<{
  node: any | null
  onClose: () => void
}>()
</script>

<template>
  <div v-if="node" class="detail-panel">
    <h3>詳細</h3>
    <p><strong>ID:</strong> {{ node.id }}</p>
    <p><strong>テキスト:</strong> {{ node.text }}</p>
    <p><strong>作成日:</strong> {{ node.created_at }}</p>

    <div v-if="node.analysis" class="analysis-block">
      <h4>🔎 分析結果</h4>

      <p><strong>要約:</strong> {{ node.analysis.summary }}</p>
      <p><strong>感情:</strong> {{ node.analysis.sentiment }}</p>

      <p>
        <strong>トピック:</strong>
        <span v-for="(topic, i) in node.analysis.topics" :key="i">
          {{ topic }}<span v-if="i < node.analysis.topics.length - 1">, </span>
        </span>
      </p>

      <p>
        <strong>重要フレーズ:</strong>
        <span v-for="(phrase, i) in node.analysis.key_phrases" :key="i">
          {{ phrase }}<span v-if="i < node.analysis.key_phrases.length - 1">, </span>
        </span>
      </p>

      <p><strong>信頼度:</strong> {{ node.analysis.confidence }}</p>

      <div>
        <strong>推奨アクション:</strong>
        <ul>
          <li v-for="(a, i) in node.analysis.action_suggestions" :key="i">{{ a }}</li>
        </ul>
      </div>
    </div>

    <button @click="onClose">閉じる</button>
  </div>
</template>

<style scoped>
.detail-panel {
  background: #fff;
  padding: 1rem;
  border-left: 2px solid #ccc;
  width: 300px;
}

.analysis-block {
  margin-top: 1rem;
  background: #f9f9f9;
  padding: 0.5rem;
  border-radius: 8px;
}
</style>
