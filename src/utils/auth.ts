import { getConfig } from "./config";

export function requireAuth() {
  try {
    return getConfig();
  } catch {
    throw new Error("❌ Run `tricox init` first");
  }
}
