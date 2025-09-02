import { defineStore } from "pinia"

export interface AppNode {
  id: number
  text: string
  created_at?: string
  x: number
  y: number
  color: string
  analysis?: any
}

export interface Link {
  source: number
  target: number
}

export const useNodeStore = defineStore("node", {
  state: () => ({
    nodes: [] as AppNode[],
    links: [] as Link[], 
    selectedNode: null as Node | null,
  }),
  actions: {
    addNode(node: AppNode) {
      if (node.x === undefined || node.y === undefined) {
        const index = this.nodes.length
        const cols = 4
        const col = index % cols
        const row = Math.floor(index / cols)

        // ✅ グリッド配置 + ランダムずらし
        node.x = 200 + col * 250 + Math.random() * 40
        node.y = 150 + row * 180 + Math.random() * 40
      }
      this.nodes.push(node)
    },
    addLink(sourceId: number, targetId: number) {
      if (!this.links.find(l =>
        (l.source === sourceId && l.target === targetId) ||
        (l.source === targetId && l.target === sourceId)
      )) {
        this.links.push({ source: sourceId, target: targetId })
      }
    },
    updateNodePosition(id: number, x: number, y: number) {
      const idx = this.nodes.findIndex((n) => n.id === id)
      if (idx !== -1) {
        console.log("update node pos", id, x, y)   // ★ 確認
        this.nodes[idx] = { ...this.nodes[idx], x, y }
      }
    },
    selectNode(node: Node) {
      this.selectedNode = node
    },
    clearSelection() {
      this.selectedNode = null
    },
    clearNodes() {
      this.nodes = []
      this.links = []
    },
  },
})
