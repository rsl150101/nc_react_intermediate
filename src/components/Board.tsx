import styled from "styled-components";
import {
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import Card from "./Card";
import { addToDo, CardState } from "../reducers/toDo";
import { createBoardData } from "../utils/dnd/creator";
import { useAppDispatch } from "../store/hooks";
import { handleDrop } from "../utils/dnd/handleDrop";
import { findDropTarget } from "../utils/dnd/findTarget";
import { isDropCardData } from "../utils/dnd/guards";

const BoardDiv = styled.div`
  padding: 30px 10px 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  text-transform: capitalize;
`;

const Area = styled.div<{ $isDraggedOver: boolean; $isDraggedFromThis: boolean }>`
  background-color: ${(props) =>
    props.$isDraggedOver
      ? "#ced4da"
      : props.$isDraggedFromThis
      ? "#adb5bd"
      : props.theme.boardColor};
  flex-grow: 1;
  padding: 10px;
  border-radius: 5px;
`;

const AddForm = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface BoardProps {
  boardId: string;
  toDos: CardState[];
}

interface ToDoAddForm {
  toDo: string;
}

const Board = ({ boardId, toDos }: BoardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [isDraggedFromThis, setIsDraggedFromThis] = useState(false);
  const { register, setValue, handleSubmit } = useForm<ToDoAddForm>();

  useEffect(() => {
    if (!ref.current) return;

    return dropTargetForElements({
      element: ref.current,
      getData: () => createBoardData(boardId),
      onDragStart: () => setIsDraggedFromThis(true),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: (event) => {
        const targetCard = findDropTarget(event.location.current.dropTargets, isDropCardData);

        if (targetCard) return;

        handleDrop(event, dispatch);
      },
    });
  }, [boardId, dispatch]);

  useEffect(() => {
    return monitorForElements({
      onDrop: () => {
        setIsDraggedOver(false);
        setIsDraggedFromThis(false);
      },
    });
  }, []);

  const onValid = ({ toDo }: ToDoAddForm) => {
    const newToDo = { id: uuidv4(), content: toDo };
    dispatch(addToDo({ newToDo, boardId }));
    setValue("toDo", "");
  };

  return (
    <BoardDiv ref={ref}>
      <Title>{boardId}</Title>
      <AddForm onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </AddForm>
      <Area $isDraggedOver={isDraggedOver} $isDraggedFromThis={isDraggedFromThis}>
        {toDos.map((toDo, index) => (
          <Card key={toDo.id} index={index} content={toDo.content} />
        ))}
      </Area>
    </BoardDiv>
  );
};

export default Board;
