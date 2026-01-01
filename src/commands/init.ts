import inquirer from "inquirer";
import chalk from "chalk";
import { saveConfig } from "../utils/config";

export default async function init() {
  const answers = await inquirer.prompt([
    {
      name: "endpoint",
      message: "Appwrite Endpoint",
      default: "https://cloud.appwrite.io/v1"
    },
    {
      name: "projectId",
      message: "Appwrite Project ID"
    },
    {
      name: "apiKey",
      message: "Appwrite API Key"
    },
    {
      name: "bucketId",
      message: "Appwrite Storage Bucket ID"
    }
  ]);

  saveConfig(answers);

  console.log(chalk.green("\n✅ Tricox initialized successfully"));
}
