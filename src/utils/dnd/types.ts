import { BoardKey, CardKey } from "./keys";

export type DragCardData = { [CardKey]: true; cardId: string; boardId: string };
export type DropCardData = {
  [CardKey]: true;
  type: string;
  cardId: string;
  boardId: string;
};
export type BoardData = { [BoardKey]: true; type?: string; boardId: string };

export type DnDHoverState = { $isDraggedOver: boolean; $isDraggedFromThis: boolean };
