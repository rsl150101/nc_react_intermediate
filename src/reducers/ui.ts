import { createSlice } from "@reduxjs/toolkit";

export interface UiState {
  isDark: boolean;
}

export const initialState: UiState = {
  isDark: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDark: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleDark } = uiSlice.actions;

export default uiSlice.reducer;
