import { stat } from "fs/promises";
import { fileURLToPath } from "url";

export async function getLastUpdated(fileUrl: string): Promise<string> {
  try {
    const path = fileURLToPath(fileUrl);
    const s = await stat(path);
    return s.mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}
