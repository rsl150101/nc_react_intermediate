import { BoardKey, CardKey } from "./keys";
import { BoardData, DragCardData, DropCardData } from "./types";

export function isDragCardData(data: unknown): data is DragCardData {
  return (
    typeof data === "object" &&
    data !== null &&
    CardKey in data &&
    typeof (data as DragCardData).cardId === "string" &&
    typeof (data as DragCardData).boardId === "string"
  );
}

export function isDropCardData(data: unknown): data is DropCardData {
  return (
    typeof data === "object" &&
    data !== null &&
    CardKey in data &&
    typeof (data as DropCardData).cardId === "string" &&
    typeof (data as DropCardData).boardId === "string"
  );
}

export function isBoardData(data: unknown): data is BoardData {
  return !!(data && typeof data === "object" && (data as any)[BoardKey]);
}
