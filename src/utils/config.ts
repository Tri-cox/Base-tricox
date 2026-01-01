import fs from "fs-extra";
import path from "path";

const CONFIG_DIR = path.join(process.env.HOME || process.env.USERPROFILE || "", ".tricox");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

export function saveConfig(data: any) {
  fs.ensureDirSync(CONFIG_DIR);
  fs.writeJsonSync(CONFIG_FILE, data, { spaces: 2 });
}

export function getConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    throw new Error("❌ Tricox not initialized. Run: tricox init");
  }
  return fs.readJsonSync(CONFIG_FILE);
}
