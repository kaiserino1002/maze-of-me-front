<script setup lang="ts">
import { ref } from "vue";
import ForceGraph from "../node/ForceGrapfh.vue"
import type { Node, Link } from "@/stores/node"

const props = defineProps<{
  nodes: Node[]
  links: Link[]
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
</script>

<template>
  <svg
  ref="svgEl"
  class="map-svg"
  xmlns="http://www.w3.org/2000/svg"
  @pointerdown="(e) => { console.log('[MapCanvas] bg pointerdown'); emits('pointerdown-bg', e) }"
>
  <g :transform="`translate(${props.pan.x},${props.pan.y}) scale(${props.zoom})`">
    <ForceGraph
        :nodes="props.nodes"
        :links="props.links"
        @pointerdown-node="(e, id) => emits('pointerdown-node', e, id)"
        @select="(id) => emits('select', id)"
      />
  </g>
</svg>
</template>

<style scoped>
.map-svg {
  width: 100%;
  height: 100%;
  cursor: grab;
}
.map-svg:active {
  cursor: grabbing;
}
</style>
