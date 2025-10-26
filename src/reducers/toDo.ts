import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface CardState {
  id: string;
  content: string;
}

interface ToDosState {
  [key: string]: CardState[];
}

export interface MoveToDoSameBoardPayload {
  dragBoardId: string;
  targetCardIndex: number;
  dragCardIndex: number;
}

export interface MoveToDoAnotherBoardPayload {
  dragBoardId: string;
  targetBoardId: string;
  targetCardIndex: number;
  dragCardIndex: number;
}

export interface PushToDoAnotherBoardPayload {
  dragBoardId: string;
  targetBoardId: string;
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
    moveToDoOnSameBoard: (
      state,
      action: PayloadAction<MoveToDoSameBoardPayload>
    ) => {
      const { dragBoardId, targetCardIndex, dragCardIndex } = action.payload;
      const dragToDo = state[dragBoardId].splice(dragCardIndex, 1)[0];
      state[dragBoardId].splice(targetCardIndex, 0, dragToDo);
    },
    moveToDoOnAnotherBoard: (
      state,
      action: PayloadAction<MoveToDoAnotherBoardPayload>
    ) => {
      const { dragBoardId, targetBoardId, targetCardIndex, dragCardIndex } =
        action.payload;
      if (!targetBoardId) return;
      const dragToDo = state[dragBoardId].splice(dragCardIndex, 1)[0];
      state[targetBoardId].splice(targetCardIndex, 0, dragToDo);
    },
    pushToDoToAnotherBoard: (
      state,
      action: PayloadAction<PushToDoAnotherBoardPayload>
    ) => {
      const { dragBoardId, targetBoardId, dragCardIndex } = action.payload;
      const dragToDo = state[dragBoardId].splice(dragCardIndex, 1)[0];
      state[targetBoardId].push(dragToDo);
    },
  },
});

export const {
  moveToDoOnSameBoard,
  moveToDoOnAnotherBoard,
  pushToDoToAnotherBoard,
} = toDoSlice.actions;

export default toDoSlice.reducer;
