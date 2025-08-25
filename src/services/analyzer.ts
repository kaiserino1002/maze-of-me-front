import axios from "axios";

export async function analyzeText(text: string) {
  const response = await axios.post(
    "/api/analyze",
    { text },
    { withCredentials: true }
  );
  return response.data;
}