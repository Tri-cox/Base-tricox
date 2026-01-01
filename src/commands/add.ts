import fs from "fs";
import path from "path";
import chalk from "chalk";
import { getStorage } from "../appwrite/client";
import { getConfig } from "../utils/config";

export default async function add(filePath: string) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(chalk.red("❌ File not found"));
      return;
    }

    const config = getConfig();
    const storage = getStorage();

    const fileName = path.basename(filePath);
    const buffer = fs.readFileSync(filePath);

    // ✅ Node 18+ supports File
    const file = new File([buffer], fileName);

    await storage.createFile(
      config.bucketId,
      "unique()",
      file
    );

    console.log(chalk.green(`✅ Component uploaded: ${fileName}`));
  } catch (error: any) {
    console.log(chalk.red("❌ Upload failed"));
    console.error(error.message);
  }
}
