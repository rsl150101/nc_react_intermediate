import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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

const initialState: ToDosState = {
  "to do": [
    {
      id: uuidv4(),
      content: "a",
    },
    {
      id: uuidv4(),
      content: "b",
    },
  ],
  doing: [
    {
      id: uuidv4(),
      content: "c",
    },
    {
      id: uuidv4(),
      content: "d",
    },
    {
      id: uuidv4(),
      content: "e",
    },
  ],
  done: [
    {
      id: uuidv4(),
      content: "f",
    },
  ],
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
  },
});

export const { moveCard } = toDoSlice.actions;

export default toDoSlice.reducer;
