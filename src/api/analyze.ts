import axios from "@/api/axios" 

export async function analyzeText(text: string) {
  const res = await axios.post("/analyze", { text })
  return res.data
}