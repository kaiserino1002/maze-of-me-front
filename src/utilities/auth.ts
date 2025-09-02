import api from "./axios";

// Preview 判定
const isPreview = import.meta.env.VITE_PREVIEW_MODE === "true";
console.log("[auth] VITE_PREVIEW_MODE =", import.meta.env.VITE_PREVIEW_MODE, "isPreview =", isPreview);


export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

/**
 * ユーザー情報を取得
 */
export async function getUser(): Promise<AuthUser | null> {
  if (isPreview) {
    console.log("[auth] Preview mode: returning mock user");
    return {
      id: 0,
      name: "Preview User",
      email: "preview@example.com",
    };
  }

  try {
    await api.get("/sanctum/csrf-cookie");
    const res = await api.get("/api/user");
    return res.data;
  } catch (err) {
    console.error("[auth] getUser failed", err);
    return null;
  }
}

/**
 * ログイン処理
 */
export async function loginWithGoogle(): Promise<AuthUser | null> {
  if (isPreview) {
    console.log("[auth] Preview mode: mock login");
    return {
      id: 0,
      name: "Preview User",
      email: "preview@example.com",
    };
  }

  // 本番 / ローカル: Google OAuth へリダイレクト
  window.location.href = `${api.defaults.baseURL}/api/auth/redirect/google`;
  return null; // リダイレクトするので戻り値は不要
}

/**
 * ログアウト処理
 */
export async function logout(): Promise<boolean> {
  if (isPreview) {
    console.log("[auth] Preview mode: mock logout");
    return true;
  }

  try {
    await api.post("/logout");
    return true;
  } catch (err) {
    console.error("[auth] logout failed", err);
    return false;
  }
}
