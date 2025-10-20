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
  targetIndex: number;
  curIndex: number;
}

const initialState: ToDosState = {
  to_do: [
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
    moveToDo: (state, action: PayloadAction<MoveToDoState>) => {
      //todo 7.8 싱글보드에서 멀티보드로 구현하면서 로직 수정 필요함
      // const { targetIndex, curIndex } = action.payload;
      // const draggedToDo = state.splice(curIndex, 1)[0];
      // state.splice(targetIndex, 0, draggedToDo);
    },
  },
});

export const { moveToDo } = toDoSlice.actions;

export default toDoSlice.reducer;
