import { BoardKey, CardKey } from "./keys";

export type DragCardData = { [CardKey]: true; dragCardIndex: number };
export type DropCardData = {
  [CardKey]: true;
  type: string;
  targetCardIndex: number;
};
export type BoardData = { [BoardKey]: true; type?: string; boardId: string };

export type DnDHoverState = { $isDraggedOver: boolean; $isDraggedFromThis: boolean };
