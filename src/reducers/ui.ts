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
  reducers: {},
});

export default uiSlice.reducer;
