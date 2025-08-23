<script setup lang="ts">
import { ref, defineExpose } from "vue"

const props = defineProps<{
  nodes: any[]
  selectedNodeId: number | null
  zoom: number
  pan: { x: number; y: number }
}>()

const emits = defineEmits<{
  (e: "select", nodeId: number): void
  (e: "pointerdown-node", ev: PointerEvent, nodeId: number): void
  (e: "pointerdown-bg", ev: PointerEvent): void
}>()

const svgEl = ref<SVGSVGElement | null>(null)
defineExpose({ svgEl })

function wrapText(text: string, maxChars = 12): string[] {
  const result: string[] = []
  for (let i = 0; i < text.length; i += maxChars) {
    result.push(text.slice(i, i + maxChars))
  }
  return result
}

function generateCloudPath(lineCount: number, lineLength: number) {
  const width = Math.min(200, lineLength * 14 + 30)
  const height = lineCount * 20 + 20
  const rx = 20, ry = 20
  return `M0,${ry} Q0,0 ${rx},0 L${width - rx},0 Q${width},0 ${width},${ry} 
          L${width},${height - ry} Q${width},${height} ${width - rx},${height} 
          L${rx},${height} Q0,${height} 0,${height - ry} Z`
}
</script>

<template>
  <svg
    ref="svgEl"
    class="map-svg"
    xmlns="http://www.w3.org/2000/svg"
    @pointerdown="(e) => emits('pointerdown-bg', e)"
  >
    <g :transform="`translate(${props.pan.x},${props.pan.y}) scale(${props.zoom})`">
      <g v-for="node in props.nodes" :key="node.id"
        class="node-group"
        :transform="`translate(${node.x}, ${node.y})`"
        @pointerdown.stop="(e) => emits('pointerdown-node', e, node.id)"
        @click.stop="emits('select', node.id)"
      >
        <path
          :d="generateCloudPath(
            wrapText(node.text).length,
            Math.max(...wrapText(node.text).map(l => l.length))
          )"
          :fill="node.color ?? '#ccc'"
          stroke="black"
        />
        <text
          text-anchor="middle"
          :x="Math.min(200, Math.max(...wrapText(node.text).map(l => l.length)) * 14 + 30) / 2"
          :y="20"
          style="pointer-events: none; font-size: 14px;"
        >
          <tspan v-for="(line, i) in wrapText(node.text)" :key="i" :x="Math.min(200, Math.max(...wrapText(node.text).map(l => l.length)) * 14 + 30) / 2" :dy="i === 0 ? 0 : 18">
            {{ line }}
          </tspan>
        </text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.map-svg {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  cursor: grab;
}
.map-svg:active {
  cursor: grabbing;
}
</style>
