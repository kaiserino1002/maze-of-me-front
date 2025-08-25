<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useNodeStore } from "@/stores/node"
import { fetchNodes, saveNode } from "@/api/nodes"

import NodeForm from "@/components/node/Form.vue"
import MapCanvas from "@/components/ui/MapCanvas.vue"
import DetailPanel from "@/components/ui/DetailPanel.vue"
import ZoomControls from "@/components/ui/ZoomControls.vue"
import { useLinkGenerator } from "@/composables/useLinkGenerator"
import { log } from "console"

const nodeStore = useNodeStore()
const selectedNodeId = ref<number | null>(null)

const zoom = ref(1)
const pan = ref({ x: 0, y: 0 })

const svgWrapper = ref<{ svgEl: SVGSVGElement | null } | null>(null)

async function loadNodes() {
  console.log("[loadNodes] start")
  const res = await fetchNodes()
  console.log("[loadNodes] fetched:", res)

  nodeStore.clearNodes()
  res.forEach((n: any) => {
    console.log("[loadNodes] adding node:", n)
    nodeStore.addNode({
      id: n.id,
      text: n.text,
      created_at: n.created_at,
      x: n.x ?? Math.random() * 800,
      y: n.y ?? Math.random() * 600,
      color: n.color ?? "#cccccc",
      analysis: typeof n.analysis === "string" ? JSON.parse(n.analysis) : n.analysis ?? null,
    })
  })

  nodeStore.links = useLinkGenerator(nodeStore.nodes)
  console.log("[loadNodes] finished, nodes:", nodeStore.nodes, "links:", nodeStore.links)
}

async function onSaveNode(node: any) {
  const res = await saveNode({ text: node.text })
  const n = res.data

  nodeStore.addNode({
    id: n.id,
    text: n.text,
    created_at: n.created_at,
    x: Math.random() * 400 + 100,
    y: Math.random() * 400 + 100,
    color: "#cccccc",
    analysis:
      n.analysis && typeof n.analysis === "string"
        ? JSON.parse(n.analysis)
        : n.analysis ?? null,
  })
}

function onSelectNode(id: number) {
  console.log(id);
  
  selectedNodeId.value = id
}

function onCloseDetail() {
  selectedNodeId.value = null
}

function onPointerDownNode(ev: PointerEvent, nodeId: number) {
  console.log("[onPointerDownNode] drag start", nodeId)

  const svg = svgWrapper.value?.svgEl
  if (!svg) {
    console.warn("[onPointerDownNode] svg not found")
    return
  }

  const node = nodeStore.nodes.find((n) => n.id === nodeId)
  if (!node) {
    console.warn("[onPointerDownNode] node not found", nodeId)
    return
  }

  const svgEl: SVGSVGElement = svg

  function getCursor(e: PointerEvent) {
    const pt = svgEl.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const ctm = svgEl.getScreenCTM()
    const result = ctm ? pt.matrixTransform(ctm.inverse()) : { x: e.clientX, y: e.clientY }
    console.log("[getCursor]", result)
    return result
  }

  const start = getCursor(ev)
  console.log("[onPointerDownNode] start pos:", start)

  function onMove(e: PointerEvent) {
    const loc = getCursor(e)
    console.log("[onMove] moving node:", nodeId, loc.x, loc.y)
    nodeStore.updateNodePosition(nodeId, loc.x, loc.y)
  }

  function onUp() {
    console.log("[onUp] drag end", nodeId)
    document.removeEventListener("pointermove", onMove)
    document.removeEventListener("pointerup", onUp)
  }

  document.addEventListener("pointermove", onMove, { passive: false })
  document.addEventListener("pointerup", onUp, { passive: false })
}


function onPointerDownBg(ev: PointerEvent) {
  const startX = ev.clientX
  const startY = ev.clientY
  const startPan = { ...pan.value }

  function onMove(e: PointerEvent) {
    pan.value.x = startPan.x + (e.clientX - startX)
    pan.value.y = startPan.y + (e.clientY - startY)
  }

  function onUp() {
    window.removeEventListener("pointermove", onMove)
    window.removeEventListener("pointerup", onUp)
  }

  window.addEventListener("pointermove", onMove)
  window.addEventListener("pointerup", onUp)
}

function zoomIn() {
  zoom.value *= 1.2
}
function zoomOut() {
  zoom.value /= 1.2
}
function resetZoom() {
  zoom.value = 1
  pan.value = { x: 0, y: 0 }
}

onMounted(() => {
  loadNodes()
})
</script>

<template>
  <div class="map-container">
    <div class="map-area">
      <MapCanvas
        ref="svgWrapper"
        :nodes="nodeStore.nodes"
        :links="nodeStore.links"
        :selectedNodeId="selectedNodeId"
        :zoom="zoom"
        :pan="pan"
        @select="onSelectNode"
        @pointerdown-node="onPointerDownNode"
        @pointerdown-bg="onPointerDownBg"
      />

      <ZoomControls @zoomIn="zoomIn" @zoomOut="zoomOut" @reset="resetZoom" />

      <div class="form-container">
        <NodeForm @saved="onSaveNode" />
      </div>
    </div>

    <DetailPanel
      :node="nodeStore.nodes.find((n) => n.id === selectedNodeId) ?? null"
      :onClose="onCloseDetail"
    />
  </div>
</template>

<style scoped>
.map-container {
  display: flex;
  height: 100vh;
}

.map-area {
  flex: 1;
  position: relative;
}

.form-container {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
}
</style>