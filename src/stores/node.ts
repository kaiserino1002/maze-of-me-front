import { defineStore } from "pinia"

export interface Node {
  id: number
  text: string
  created_at?: string
  x: number
  y: number
  color: string
  analysis?: any
}

export const useNodeStore = defineStore("node", {
  state: () => ({
    nodes: [] as Node[],
    selectedNode: null as Node | null,
  }),
  actions: {
    addNode(node: Node) {
      this.nodes.push(node)
    },
    updateNodePosition(id: number, x: number, y: number) {
      const n = this.nodes.find((n) => n.id === id)
      if (n) {
        n.x = x
        n.y = y
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
    },
  },
})
