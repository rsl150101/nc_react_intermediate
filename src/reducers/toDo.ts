import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface CardState {
  id: string;
  content: string;
}

interface ToDosState {
  [key: string]: CardState[];
}

export interface MoveToDoState {
  dragBoardId: string;
  targetBoardId?: string;
  targetCardIndex: number;
  dragCardIndex: number;
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
    moveToDoOnSameBoard: (state, action: PayloadAction<MoveToDoState>) => {
      const { dragBoardId, targetCardIndex, dragCardIndex } = action.payload;
      const dragToDo = state[dragBoardId].splice(dragCardIndex, 1)[0];
      state[dragBoardId].splice(targetCardIndex, 0, dragToDo);
    },
  },
});

export const { moveToDoOnSameBoard } = toDoSlice.actions;

export default toDoSlice.reducer;
