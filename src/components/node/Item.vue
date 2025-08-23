<script setup lang="ts">
import { computed, ref } from "vue"
import { generateCloudPath } from "@/utilities/cloudShape"

interface Props {
  node: {
    id: number
    text: string
    x: number
    y: number
    color?: string
  }
  selected?: boolean
}

const props = defineProps<Props>()

const wrapText = (text: string, maxChars = 12) => {
  const result: string[] = []
  let line = ""
  for (const char of text) {
    line += char
    if (line.length >= maxChars) {
      result.push(line)
      line = ""
    }
  }
  if (line) result.push(line)
  return result
}
const lines = computed(() => wrapText(props.node.text))

const width = computed(() => Math.max(...lines.value.map(l => l.length)) * 14 + 40)
const height = computed(() => lines.value.length * 20 + 40)

const path = ref(generateCloudPath(width.value, height.value))
</script>

<template>
  <g :transform="`translate(${node.x}, ${node.y})`">
    <path
      :d="path"
      :fill="node.color || '#eee'"
      stroke="black"
      stroke-width="1"
    />
    <text
      text-anchor="middle"
      dominant-baseline="middle"
      font-size="14"
      fill="black"
    >
      <tspan
        v-for="(line, i) in lines"
        :key="i"
        x="0"
        :dy="i === 0 ? '0' : '1.2em'"
      >
        {{ line }}
      </tspan>
    </text>
  </g>
</template>