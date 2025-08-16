import React from "react";

import { Category, changeCategory, IToDo } from "../reducers/toDo";
import { useAppDispatch } from "../store/hooks";

function ToDo(toDo: IToDo) {
  const dispatch = useAppDispatch();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;

    dispatch(
      changeCategory({ id: toDo.id, category: name as IToDo["category"] })
    );
  };

  return (
    <li>
      <span>{toDo.text}</span>
      {toDo.category !== Category.DOING && (
        <button name={Category.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {toDo.category !== Category.TO_DO && (
        <button name={Category.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {toDo.category !== Category.DONE && (
        <button name={Category.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
