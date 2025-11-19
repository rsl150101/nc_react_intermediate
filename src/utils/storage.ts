import { ToDosState } from "../reducers/toDo";

export const TODOS_STORAGE_KEY = "TODOS";

export const saveToLocalStorage = (state: ToDosState) => {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(state));
};

export const loadFromLocalStorage = (): ToDosState => {
  const data = localStorage.getItem(TODOS_STORAGE_KEY);

  if (!data) {
    const initialState: ToDosState = { "to do": [], doing: [], done: [] };
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(initialState));
    return initialState;
  }
  try {
    return JSON.parse(data) as ToDosState;
  } catch (error) {
    console.error(error);
    const initialState: ToDosState = { "to do": [], doing: [], done: [] };
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(initialState));
    return initialState;
  }
};
