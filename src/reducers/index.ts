import { combineReducers } from "@reduxjs/toolkit";

import toDo from "./toDo";

const rootReducer = combineReducers({
  toDo,
});

export default rootReducer;
