import { combineReducers } from "@reduxjs/toolkit";

import ui from "./ui";

const rootReducer = combineReducers({
  ui,
});

export default rootReducer;
