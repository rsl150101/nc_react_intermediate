import styled from "styled-components";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { memo, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import Card from "./Card";
import { addToDo, CardState } from "../reducers/toDo";
import { createDragBoardData, createDropBoardData } from "../utils/dnd/creator";
import { useAppDispatch } from "../store/hooks";
import { handleBoardDrop, handleCardDrop } from "../utils/dnd/handleDrop";
import { findDropTarget } from "../utils/dnd/findTarget";
import { isBoardData, isDragCardData, isDropCardData } from "../utils/dnd/guards";
import { DnDHoverState } from "../utils/dnd/types";

const BoardDiv = styled.div<DnDHoverState>`
  padding: 30px 10px 20px 10px;
  background-color: ${(props) => (props.$isDraggedOver ? "#e2e4e9" : props.theme.boardColor)};
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

  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

const Area = styled.div<DnDHoverState>`
  background-color: ${(props) =>
    props.$isDraggedOver
      ? "#ced4da"
      : props.$isDraggedFromThis
      ? "#adb5bd"
      : props.theme.boardColor};
  flex-grow: 1;
  padding: 10px;
  border-radius: 5px;
  margin-top: 8px;
`;

const AddForm = styled.form`
  margin-top: 5px;
  width: 100%;
  input {
    width: 100%;
    border-radius: 3px;
    border: none;
    min-height: 30px;
    padding-left: 10px;
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
  const handleRef = useRef<HTMLHeadingElement>(null);
  const dispatch = useAppDispatch();
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [isDraggedFromThis, setIsDraggedFromThis] = useState(false);
  const { register, setValue, handleSubmit } = useForm<ToDoAddForm>();

  useEffect(() => {
    if (!ref.current || !handleRef.current) return;

    return draggable({
      element: ref.current,
      dragHandle: handleRef.current,
      getInitialData: () => createDragBoardData(boardId),
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        setCustomNativeDragPreview({
          nativeSetDragImage,
          getOffset: () => ({ x: 20, y: 20 }),
          render: ({ container }) => {
            const preview = ref.current?.cloneNode(true) as HTMLElement;

            preview.style.transform = "rotate(-4deg)";
            preview.style.opacity = "1";
            preview.style.width = `${ref.current?.clientWidth}px`;
            preview.style.backgroundColor = "white";
            preview.style.boxShadow =
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";

            container.appendChild(preview);
          },
        });
      },
    });
  }, [boardId]);

  useEffect(() => {
    if (!ref.current) return;

    return dropTargetForElements({
      element: ref.current,
      getData: () => createDropBoardData(boardId),
      onDragStart: () => setIsDraggedFromThis(true),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),

      onDrop: (event) => {
        const targetCard = findDropTarget(event.location.current.dropTargets, isDropCardData);

        if (targetCard) return;

        if (isDragCardData(event.source.data)) {
          handleCardDrop(event, dispatch);
        } else if (isBoardData(event.source.data)) {
          handleBoardDrop(event, dispatch);
        }
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
    <BoardDiv ref={ref} $isDraggedOver={isDraggedOver} $isDraggedFromThis={isDraggedFromThis}>
      <Title ref={handleRef}>{boardId}</Title>
      <AddForm onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </AddForm>
      <Area $isDraggedOver={isDraggedOver} $isDraggedFromThis={isDraggedFromThis}>
        {toDos.map((toDo) => (
          <Card key={toDo.id} cardId={toDo.id} boardId={boardId} content={toDo.content} />
        ))}
      </Area>
    </BoardDiv>
  );
};

export default memo(Board);
