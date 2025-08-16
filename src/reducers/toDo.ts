import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/configureStore";

export type Category = "TO_DO" | "DOING" | "DONE";

export interface IToDo {
  id: number;
  text: string;
  category: Category;
}

export interface ToDoState {
  toDos: IToDo[];
  curCategory: Category;
}

const initialState: ToDoState = {
  toDos: [],
  curCategory: "TO_DO",
};

const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    addToDo: (state, action: PayloadAction<Omit<IToDo, "id">>) => {
      const newToDo: IToDo = {
        id: Date.now(),
        ...action.payload,
      };
      state.toDos.unshift(newToDo);
    },
    changeCategory: (state, action: PayloadAction<Omit<IToDo, "text">>) => {
      const { id, category } = action.payload;
      const target = state.toDos.find((toDo) => toDo.id === id);
      if (target) {
        target.category = category;
      }
    },
    setCurCategory: (state, action: PayloadAction<Category>) => {
      state.curCategory = action.payload;
    },
  },
});

const selectToDoState = (state: RootState) => state.toDo;

export const selectToDosByCategory = createSelector(selectToDoState, (state) =>
  state.toDos.filter((toDo) => toDo.category === state.curCategory)
);

export const { addToDo, changeCategory, setCurCategory } = toDoSlice.actions;

export default toDoSlice.reducer;
