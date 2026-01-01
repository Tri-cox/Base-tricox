import fs from "fs";
import path from "path";
import chalk from "chalk";
import axios from "axios";
import { getStorage } from "../appwrite/client";
import { getConfig } from "../utils/config";

type GetOptions = {
  dir?: string;
};

export default async function get(name: string, options: GetOptions) {
  try {
    const config = getConfig();
    const storage = getStorage();

    // 1️⃣ Find file by name (Appwrite needs fileId)
    const list = await storage.listFiles(config.bucketId);
    const file = list.files.find(f => f.name === name);

    if (!file) {
      console.log(chalk.red(`❌ Component not found: ${name}`));
      return;
    }

    // 2️⃣ Decide output directory
    const outputDir = options.dir
      ? path.resolve(process.cwd(), options.dir)
      : process.cwd();

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, name);

    // 3️⃣ Get signed download URL
    const downloadUrl = storage.getFileDownload(
      config.bucketId,
      file.$id
    ) as unknown as string;

    // 4️⃣ Download binary content
    const response = await axios.get(downloadUrl, {
      responseType: "arraybuffer",
    });

    fs.writeFileSync(outputPath, response.data);

    console.log(chalk.green(`✅ Component downloaded: ${outputPath}`));
  } catch (error: any) {
    console.log(chalk.red("❌ Download failed"));
    console.error(error.message);
  }
}
