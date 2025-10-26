import { BoardKey, CardKey } from "./keys";
import { BoardData, DragCardData, DropCardData } from "./types";

export function isDragCardData(data: unknown): data is DragCardData {
  return !!(data && typeof data === "object" && (data as any)[CardKey]);
}

export function isDropCardData(data: unknown): data is DropCardData {
  return !!(data && typeof data === "object" && (data as any)[CardKey]);
}

export function isBoardData(data: unknown): data is BoardData {
  return !!(data && typeof data === "object" && (data as any)[BoardKey]);
}
