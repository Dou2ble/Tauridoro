import { appLocalDataDir, appConfigDir } from "@tauri-apps/api/path";
import { readTextFile, writeTextFile, createDir } from "@tauri-apps/api/fs";

export async function notesPath(): Promise<string> {
  try {
    await createDir(await appLocalDataDir()).catch();
  } catch {}

  return (await appLocalDataDir()) + "notes.txt";
}

export async function settingsPath(): Promise<string> {
  try {
    await createDir(await appConfigDir()).catch();
  } catch {}

  return (await appConfigDir()) + "tauridoro.toml";
}
