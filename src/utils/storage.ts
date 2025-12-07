import { ToDosState } from "../reducers/toDo";

export const TODOS_STORAGE_KEY = "TODOS";

export const saveToLocalStorage = (state: ToDosState) => {
  try {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("LocalStorage: The data cannot be saved because access is blocked.");
  }
};

export const loadFromLocalStorage = (): ToDosState => {
  try {
    const data = localStorage.getItem(TODOS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as ToDosState;
    } else {
      const initialState: ToDosState = {
        boards: { "to do": [], doing: [], done: [] },
        boardOrder: ["to do", "doing", "done"],
      };
      localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(initialState));
      return initialState;
    }
  } catch (error) {
    console.warn("LocalStorage: Access has been blocked. Start with default values.");
  }
  return {
    boards: { "to do": [], doing: [], done: [] },
    boardOrder: ["to do", "doing", "done"],
  };
};
