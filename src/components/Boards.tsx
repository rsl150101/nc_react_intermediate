import styled from "styled-components";
import { memo, useEffect, useRef, useState } from "react";
import {
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

import { useAppSelector } from "../store/hooks";
import Board from "./Board";
import { BoardKey } from "../utils/dnd/keys";

const BoardsDiv = styled.div<{ $isDraggedOver: boolean }>`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  background-color: ${(props) => (props.$isDraggedOver ? "#adb5bd" : "transparent")};
  outline: ${(props) => (props.$isDraggedOver ? "5px solid #adb5bd" : "none")};
  border-radius: 5px;
`;

const Boards = () => {
  const { boards: toDos, boardOrder } = useAppSelector((state) => state.toDo);
  const ref = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    return dropTargetForElements({
      element: ref.current,
      onDragStart: () => {
        setIsDraggedOver(true);
      },
      canDrop: ({ source }) => {
        return (source.data as any)[BoardKey];
      },
      onDrop: () => {
        setIsDraggedOver(false);
      },
    });
  }, []);

  useEffect(() => {
    return monitorForElements({
      onDrop: () => {
        setIsDraggedOver(false);
      },
    });
  }, []);

  return (
    <BoardsDiv ref={ref} $isDraggedOver={isDraggedOver}>
      {boardOrder.map((boardId) => (
        <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
      ))}
    </BoardsDiv>
  );
};

export default memo(Boards);
