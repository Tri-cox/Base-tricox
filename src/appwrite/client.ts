import { Client, Storage } from "appwrite";
import { getConfig } from "../utils/config";

let storage: Storage;

export function getStorage() {
  if (storage) return storage;

  const config = getConfig();

  const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId);
    
  client.headers["X-Appwrite-Key"] = config.apiKey;

  storage = new Storage(client);
  return storage;
}
