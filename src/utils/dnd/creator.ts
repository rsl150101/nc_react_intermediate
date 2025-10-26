import { BOARDDROPTYPE, CARDDROPTYPE } from "../../constants/dnd";
import { BoardKey, CardKey } from "./keys";
import { BoardData, DragCardData, DropCardData } from "./types";

export function createDragCardData(dragCardIndex: number): DragCardData {
  return { [CardKey]: true, dragCardIndex };
}

export function createDropCardData(targetCardIndex: number): DropCardData {
  return { [CardKey]: true, type: CARDDROPTYPE, targetCardIndex };
}

export function createBoardData(boardId: string): BoardData {
  return { [BoardKey]: true, type: BOARDDROPTYPE, boardId };
}
