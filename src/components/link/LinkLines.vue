<script setup lang="ts">
import type { Node, Link } from "@/stores/node"

const props = defineProps<{
  nodes: Node[]
  links: Link[]
}>()
</script>

<template>
  <line
    v-for="(link, i) in props.links"
    :key="'link-' + i"
    :x1="props.nodes.find((n) => n.id === link.source)?.x ?? 0"
    :y1="props.nodes.find((n) => n.id === link.source)?.y ?? 0"
    :x2="props.nodes.find((n) => n.id === link.target)?.x ?? 0"
    :y2="props.nodes.find((n) => n.id === link.target)?.y ?? 0"
    stroke="#aaa"
    stroke-width="1.5"
  />
</template>
