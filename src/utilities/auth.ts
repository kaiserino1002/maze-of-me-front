import api from "./axios";

export async function getUser() {
  // Vercel Preview 環境用: ダミーユーザーを返す
  if (import.meta.env.VITE_PREVIEW_MODE === "true") {
    console.log("[auth] Preview mode: returning mock user");
    return {
      id: 0,
      name: "Preview User",
      email: "preview@example.com",
    };
  }

  // ローカル/本番用
  await api.get("/sanctum/csrf-cookie");
  const res = await api.get("/api/user");
  return res.data;
}

export async function loginWithGoogle() {
  if (import.meta.env.VITE_PREVIEW_MODE === "true") {
    console.log("[auth] Preview mode: skip Google login");
    return;
  }
  window.location.href = `${api.defaults.baseURL}/api/auth/redirect/google`;
}

export async function logout() {
  if (import.meta.env.VITE_PREVIEW_MODE === "true") {
    console.log("[auth] Preview mode: skip logout");
    return;
  }
  await api.post("/logout");
}
