import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CardState {
  id: string;
  content: string;
}

interface ToDosState {
  [key: string]: CardState[];
}

export interface MoveCardPayload {
  dragBoardId: string;
  dragCardIndex: number;
  targetBoardId: string;
  targetCardIndex?: number;
}

interface AddToDoPayload {
  newToDo: CardState;
  boardId: string;
}

const initialState: ToDosState = {
  "to do": [],
  doing: [],
  done: [],
};

const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    moveCard: (state, action: PayloadAction<MoveCardPayload>) => {
      const { dragBoardId, dragCardIndex, targetBoardId, targetCardIndex } = action.payload;
      const sourceBoard = state[dragBoardId];
      const destBoard = state[targetBoardId];

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

      state[boardId].unshift(newToDo);
    },
  },
});

export const { moveCard, addToDo } = toDoSlice.actions;

export default toDoSlice.reducer;
