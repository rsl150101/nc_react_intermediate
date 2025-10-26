import styled from "styled-components";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef } from "react";

import Card from "./Card";
import { CardState, pushToDoToAnotherBoard } from "../reducers/toDo";
import { createBoardData } from "../utils/dnd/creator";
import { findDropTarget } from "../utils/dnd/findTarget";
import { isBoardData, isDragCardData } from "../utils/dnd/guards";
import { useAppDispatch } from "../store/hooks";

const BoardDiv = styled.div`
  padding: 30px 10px 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
  text-transform: capitalize;
`;

interface BoardProps {
  boardId: string;
  toDos: CardState[];
}

const Board = ({ boardId, toDos }: BoardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!ref.current) return;

    return dropTargetForElements({
      element: ref.current,
      getData: () => createBoardData(boardId),
      onDrop: ({ source, location }) => {
        const targetBoard = findDropTarget(
          location.current.dropTargets,
          isBoardData
        );
        const dragBoard = findDropTarget(
          location.initial.dropTargets,
          isBoardData
        );
        const targetCard = findDropTarget(
          location.current.dropTargets,
          isDragCardData
        );

        if (!targetBoard || !dragBoard || targetCard) return;
        if (!isDragCardData(source.data)) return;

        const { dragCardIndex } = source.data;
        const { boardId: targetBoardId } = targetBoard;
        const { boardId: dragBoardId } = dragBoard;

        if (targetBoardId !== dragBoardId) {
          dispatch(
            pushToDoToAnotherBoard({
              targetBoardId,
              dragBoardId,
              dragCardIndex,
            })
          );
        }
      },
    });
  }, [boardId, dispatch]);

  return (
    <BoardDiv ref={ref}>
      <Title>{boardId}</Title>
      {toDos.map((toDo, index) => (
        <Card key={toDo.id} index={index} content={toDo.content} />
      ))}
    </BoardDiv>
  );
};

export default Board;
