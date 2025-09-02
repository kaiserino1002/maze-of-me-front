import axios from "@/api/axios"
import { useNodeStore } from "@/stores/node"
import type { AppNode } from "@/stores/node";

export interface NodePayload {
  text: string
  analysis?: any
}

const isPreview = import.meta.env.VITE_PREVIEW_MODE === "true"

export async function fetchNodes() {
  if (isPreview) {
    console.log("[nodes] Preview mode: returning empty list")
    return []
  }
  const res = await axios.get("/nodes")
  return res.data
}

export async function saveNode(payload: NodePayload) {
  if (isPreview) {
    console.log("[nodes] Preview mode: mock save", payload)
    const mockNode: AppNode = {
      id: Date.now(),
      text: payload.text,
      created_at: new Date().toISOString(),
      color: "#ccc",
      analysis: "mock analysis",
      x: 0, // ダミー値
      y: 0, // ダミー値
};
    const store = useNodeStore()
    store.addNode(mockNode)
    return { data: mockNode }
  }

  const res = await axios.post("/node", payload)
  return res.data
}

export async function deleteNode(id: number) {
  if (isPreview) {
    console.log("[nodes] Preview mode: mock delete", id)
    const store = useNodeStore()
    store.nodes = store.nodes.filter((n) => n.id !== id)
    return
  }

  await axios.delete(`/node/${id}`)
}
