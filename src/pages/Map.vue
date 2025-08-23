<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useNodeStore } from "@/stores/node"
import { fetchNodes, saveNode } from "@/api/nodes"

import NodeForm from "@/components/node/Form.vue"
import MapCanvas from "@/components/node/MapCanvas.vue"
import DetailPanel from "@/components/ui/DetailPanel.vue"
import ZoomControls from "@/components/ui/ZoomControls.vue"

const nodeStore = useNodeStore()
const selectedNodeId = ref<number | null>(null)

const zoom = ref(1)
const pan = ref({ x: 0, y: 0 })

const svgWrapper = ref<{ svgEl: SVGSVGElement | null } | null>(null)

async function loadNodes() {
  const res = await fetchNodes()
  nodeStore.clearNodes()

  res.forEach((n: any, i: number) => {
    nodeStore.addNode({
      id: n.id,
      text: n.text,
      created_at: n.created_at,
      x: n.x ?? (i % 5) * 200 + 100,
      y: n.y ?? Math.floor(i / 5) * 150 + 100,
      color: n.color ?? "#cccccc",
      analysis:
        n.analysis && typeof n.analysis === "string"
          ? JSON.parse(n.analysis)
          : n.analysis ?? null,
    })
  })
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
  selectedNodeId.value = id
}

function onCloseDetail() {
  selectedNodeId.value = null
}

function onPointerDownNode(ev: PointerEvent, nodeId: number) {
  const svg = svgWrapper.value?.svgEl
  if (!svg) return

  const pt = svg.createSVGPoint()
  pt.x = ev.clientX
  pt.y = ev.clientY
  const cursor = pt.matrixTransform(svg.getScreenCTM()?.inverse())

  const node = nodeStore.nodes.find((n) => n.id === nodeId)
  if (!node) return

  const offsetX = cursor.x - node.x
  const offsetY = cursor.y - node.y

  function onMove(e: PointerEvent) {
    if (!svg) return

    pt.x = e.clientX
    pt.y = e.clientY

    const ctm = svg.getScreenCTM()
    if (!ctm) return

    const loc = pt.matrixTransform(ctm.inverse())
    nodeStore.updateNodePosition(nodeId, loc.x - offsetX, loc.y - offsetY)
  }
  function onUp() {
    window.removeEventListener("pointermove", onMove)
    window.removeEventListener("pointerup", onUp)
  }

  window.addEventListener("pointermove", onMove)
  window.addEventListener("pointerup", onUp)
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