import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface ToDoState {
  id: string;
  content: string;
}

export interface MoveToDoState {
  targetIndex: number;
  curIndex: number;
}

const initialState: ToDoState[] = [
  {
    id: uuidv4(),
    content: "a",
  },
  {
    id: uuidv4(),
    content: "b",
  },
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
  {
    id: uuidv4(),
    content: "f",
  },
];

const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    moveToDo: (state, action: PayloadAction<MoveToDoState>) => {
      const { targetIndex, curIndex } = action.payload;
      const draggedToDo = state.splice(curIndex, 1)[0];
      state.splice(targetIndex, 0, draggedToDo);
    },
  },
});

export const { moveToDo } = toDoSlice.actions;

export default toDoSlice.reducer;
