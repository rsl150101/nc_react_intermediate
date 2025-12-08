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
  dragCardId: string;
  dragBoardId: string;
  targetBoardId: string;
  targetCardId?: string;
}

interface DeleteCardPayload {
  boardId: string;
  cardId: string;
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
      const { dragCardId, dragBoardId, targetBoardId, targetCardId } = action.payload;
      const sourceBoard = state.boards[dragBoardId];
      const destBoard = state.boards[targetBoardId];

      if (!sourceBoard || !destBoard) return;

      const dragCardIndex = sourceBoard.findIndex((card) => card.id === dragCardId);
      if (dragCardIndex === -1) return;

      const [dragCard] = sourceBoard.splice(dragCardIndex, 1);

      let targetIndex = destBoard.findIndex((card) => card.id === targetCardId);
      if (targetIndex === -1) {
        // If the target card is not found (e.g., dropping on the board itself),
        // or if it's the same card, place it at the end.
        targetIndex = destBoard.length;
      }

      destBoard.splice(targetIndex, 0, dragCard);
    },
    addToDo: (state, action: PayloadAction<AddToDoPayload>) => {
      const { newToDo, boardId } = action.payload;

      if (!newToDo || !boardId) return;

      state.boards[boardId].unshift(newToDo);
    },
    deleteToDo: (state, action: PayloadAction<DeleteCardPayload>) => {
      const { boardId, cardId } = action.payload;
      const board = state.boards[boardId];
      if (!board) return;
      state.boards[boardId] = board.filter((card) => card.id !== cardId);
    },
    changeBoard: (state, action: PayloadAction<ChangeBoardPayload>) => {
      const { dragBoardId, targetBoardId } = action.payload;
      const { boardOrder } = state;

      const srcIdx = boardOrder.findIndex((boardId) => boardId === dragBoardId);
      const desIdx = boardOrder.findIndex((boardId) => boardId === targetBoardId);

      [boardOrder[srcIdx], boardOrder[desIdx]] = [boardOrder[desIdx], boardOrder[srcIdx]];
    },
    addBoard: (state, action: PayloadAction<string>) => {
      const newBoardId = action.payload.toLowerCase();
      if (state.boards[newBoardId]) return;
      state.boards[newBoardId] = [];
      state.boardOrder.push(newBoardId);
    },
  },
});

export const { moveCard, addToDo, deleteToDo, changeBoard, addBoard } = toDoSlice.actions;

export default toDoSlice.reducer;
