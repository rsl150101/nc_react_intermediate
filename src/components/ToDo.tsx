import React from "react";

import { setCategory, ToDoState } from "../reducers/toDo";
import { useAppDispatch } from "../store/hooks";

function ToDo(toDo: ToDoState) {
  const dispatch = useAppDispatch();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;

    dispatch(
      setCategory({ id: toDo.id, category: name as ToDoState["category"] })
    );
  };

  return (
    <li>
      <span>{toDo.text}</span>
      {toDo.category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {toDo.category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {toDo.category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
