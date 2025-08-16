import React from "react";

import {
  Category,
  selectToDosByCategory,
  setCurCategory,
} from "../reducers/toDo";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useAppSelector(selectToDosByCategory);
  const category = useAppSelector((state) => state.toDo.curCategory);
  const dispatch = useAppDispatch();

  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    dispatch(setCurCategory(e.currentTarget.value as Category));
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Category.TO_DO}>To Do</option>
        <option value={Category.DOING}>Doing</option>
        <option value={Category.DONE}>Done</option>
      </select>
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
