import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { loadFromLocalStorage } from "../utils/storage";

export interface CardState {
  id: string;
  content: string;
}

export interface ToDosState {
  boards: {
    [key: string]: CardState[];
  };
  boardOrder: string[];
}

export interface MoveCardPayload {
  dragBoardId: string;
  dragCardIndex: number;
  targetBoardId: string;
  targetCardIndex?: number;
}

interface DeleteCardPayload {
  dragBoardId: string;
  dragCardIndex: number;
}

interface AddToDoPayload {
  newToDo: CardState;
  boardId: string;
}

interface ChangeBoardPayload {
  dragBoardId: string;
  targetBoardId: string;
}

const initialState: ToDosState = loadFromLocalStorage();

const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    moveCard: (state, action: PayloadAction<MoveCardPayload>) => {
      const { dragBoardId, dragCardIndex, targetBoardId, targetCardIndex } = action.payload;
      const sourceBoard = state.boards[dragBoardId];
      const destBoard = state.boards[targetBoardId];

      if (!sourceBoard || !destBoard) return;
      if (
        dragBoardId === targetBoardId &&
        (dragCardIndex === targetCardIndex || dragCardIndex + 1 === targetCardIndex)
      )
        return;

      const [dragCard] = sourceBoard.splice(dragCardIndex, 1);

      let insertIndex = targetCardIndex ?? destBoard.length;
      if (dragBoardId === targetBoardId && dragCardIndex < insertIndex && targetCardIndex) {
        insertIndex -= 1;
      }

      destBoard.splice(insertIndex, 0, dragCard);
    },
    addToDo: (state, action: PayloadAction<AddToDoPayload>) => {
      const { newToDo, boardId } = action.payload;

      if (!newToDo || !boardId) return;

      state.boards[boardId].unshift(newToDo);
    },
    deleteToDo: (state, action: PayloadAction<DeleteCardPayload>) => {
      const { dragBoardId, dragCardIndex } = action.payload;

      if (dragBoardId === null || dragCardIndex === null) return;

      state.boards[dragBoardId].splice(dragCardIndex, 1);
    },
    changeBoard: (state, action: PayloadAction<ChangeBoardPayload>) => {
      const { dragBoardId, targetBoardId } = action.payload;
      const { boardOrder } = state;

      const srcIdx = boardOrder.findIndex((boardId) => boardId === dragBoardId);
      const desIdx = boardOrder.findIndex((boardId) => boardId === targetBoardId);

      [boardOrder[srcIdx], boardOrder[desIdx]] = [boardOrder[desIdx], boardOrder[srcIdx]];
    },
  },
});

export const { moveCard, addToDo, deleteToDo, changeBoard } = toDoSlice.actions;

export default toDoSlice.reducer;
