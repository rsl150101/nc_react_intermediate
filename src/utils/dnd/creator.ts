import { BOARDDROPTYPE, CARDDROPTYPE } from "../../constants/dnd";
import { BoardKey, CardKey } from "./keys";
import { BoardData, DragCardData, DropCardData } from "./types";

export function createDragCardData(cardId: string, boardId: string): DragCardData {
  return { [CardKey]: true, cardId, boardId };
}

export function createDropCardData(cardId: string, boardId: string): DropCardData {
  return { [CardKey]: true, type: CARDDROPTYPE, cardId, boardId };
}

export function createDragBoardData(boardId: string): BoardData {
  return { [BoardKey]: true, boardId };
}

export function createDropBoardData(boardId: string): BoardData {
  return { [BoardKey]: true, type: BOARDDROPTYPE, boardId };
}
