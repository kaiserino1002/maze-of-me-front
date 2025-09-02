<script setup lang="ts">
import { computed } from "vue"
import { generateCloudPath } from "@/utilities/cloudShape"
import type { Node } from "@/stores/node"

const props = defineProps<{ node: Node }>()

const maxChars = 12
const fontSize = 14
const lineHeight = 1.2

// 改行処理
const wrappedLines = computed(() => {
  const text = props.node.text || ""
  const regex = new RegExp(`.{1,${maxChars}}`, "g")
  return text.match(regex) || []
})

// サイズ計算
const width = computed(() => {
  const longestLine = wrappedLines.value.reduce(
    (max, line) => Math.max(max, line.length),
    0
  )
  return longestLine * (fontSize * 0.7) + 40
})

const height = computed(() => {
  return wrappedLines.value.length * fontSize * lineHeight + 30
})

const cloudPath = computed(() =>
  generateCloudPath(width.value, height.value)
)
</script>

<template>
  <g>
    <!-- 雲 -->
    <path
      :d="cloudPath"
      fill="lightgray"
      stroke="black"
      stroke-width="1.5"
      :transform="`translate(${-width/2}, ${-height/2})`"
    />

    <!-- テキスト（中央寄せ） -->
    <text
      text-anchor="middle"
      dominant-baseline="middle"
      style="font-size: 14px; pointer-events: none; white-space: pre-line;"
    >
      <tspan
        v-for="(line, i) in wrappedLines"
        :key="i"
        x="0"
        :y="(i - (wrappedLines.length - 1) / 2) * fontSize * lineHeight"
      >
        {{ line }}
      </tspan>
    </text>
  </g>
</template>
