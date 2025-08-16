import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/configureStore";

export interface ToDoState {
  id: number;
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
}

const initialState: ToDoState[] = [];

const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    addToDo: (state, action: PayloadAction<Omit<ToDoState, "id">>) => {
      const newToDo: ToDoState = {
        id: Date.now(),
        ...action.payload,
      };
      state.unshift(newToDo);
    },
    setCategory: (state, action: PayloadAction<Omit<ToDoState, "text">>) => {
      const { id, category } = action.payload;
      const target = state.find((toDo) => toDo.id === id);
      if (target) {
        target.category = category;
      }
    },
  },
});

const selectToDos = (state: RootState) => state.toDo;

export const selectToDosByCategory = createSelector(selectToDos, (toDos) => [
  toDos.filter((toDo) => toDo.category === "TO_DO"),
  toDos.filter((toDo) => toDo.category === "DOING"),
  toDos.filter((toDo) => toDo.category === "DONE"),
]);

export const { addToDo, setCategory } = toDoSlice.actions;

export default toDoSlice.reducer;
