import axios from "@/api/axios"
import { useNodeStore } from "@/stores/node"

export interface NodePayload {
  text: string
  analysis?: any
}

// Preview モード判定
const isPreview = import.meta.env.VITE_PREVIEW_MODE === "true"

/**
 * ノード保存
 */
export async function saveNode(payload: NodePayload) {
  if (isPreview) {
    console.log("[nodes] Preview mode: mock save", payload)
    const mockNode = {
      id: Date.now(), // 仮ID
      text: payload.text,
      created_at: new Date().toISOString(),
      color: "#cccccc",
      analysis: payload.analysis ?? null,
    }

    // Pinia に直接追加
    const store = useNodeStore()
    store.addNode(mockNode)

    return { data: mockNode }
  }

  const res = await axios.post("/node", payload)
  return res.data
}

/**
 * ノード取得
 */
export async function fetchNodes() {
  if (isPreview) {
    console.log("[nodes] Preview mode: returning mock empty list")
    return []
  }

  const res = await axios.get("/nodes")
  return res.data
}
