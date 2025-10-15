import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface ToDoState {
  id: string;
  content: string;
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
  reducers: {},
});

export const {} = toDoSlice.actions;

export default toDoSlice.reducer;
