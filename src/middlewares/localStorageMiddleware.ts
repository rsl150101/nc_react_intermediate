import { Middleware } from "@reduxjs/toolkit";

import { saveToLocalStorage } from "../utils/storage";
import { addToDo, changeBoard, deleteToDo, moveCard, addBoard } from "../reducers/toDo";

const matchers = [addToDo, moveCard, deleteToDo, changeBoard, addBoard];

let timer: number | undefined;

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  const shouldSave = matchers.some((matcher) => matcher.match(action));

  if (shouldSave) {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      const state = store.getState().toDo;
      saveToLocalStorage(state);
    }, 200);
  }
  return result;
};
