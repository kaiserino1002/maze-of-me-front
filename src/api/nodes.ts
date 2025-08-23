import axios from "@/api/axios" 

export interface NodePayload {
  text: string
  analysis?: any
}

export async function saveNode(payload: NodePayload) {
  const res = await axios.post("/node", payload, {
  })
  return res.data
}

export async function fetchNodes() {
  const res = await axios.get("/nodes", {
  })
  return res.data
}
