<script setup lang="ts">
import type { Node, Link } from "@/stores/node"
import NodeCloud from "./NodeCloud.vue"
import LinkLines from "../link/LinkLines.vue"

const props = defineProps<{
  nodes: Node[]
  links: Link[]
}>()

const emits = defineEmits<{
  (e: "select", nodeId: number): void
  (e: "pointerdown-node", ev: PointerEvent, nodeId: number): void
}>()
</script>

<template>
  <!-- リンク -->
  <LinkLines :nodes="props.nodes" :links="props.links" />

  <!-- ノード -->
  <g
    v-for="node in props.nodes"
    :key="node.id"
    class="node-group"
    :transform="`translate(${node.x}, ${node.y})`"
    @pointerdown.stop="(e) => emits('pointerdown-node', e, node.id)"
    @click.stop="emits('select', node.id)"
    >
    <NodeCloud :node="node" />
  </g>
</template>
