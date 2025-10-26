import styled from "styled-components";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef } from "react";

import Card from "./Card";
import { CardState } from "../reducers/toDo";
import { createBoardData } from "../utils/dnd/creator";
import { findDropTarget } from "../utils/dnd/findTarget";
import { isBoardData } from "../utils/dnd/guards";

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
  useEffect(() => {
    if (!ref.current) return;

    return dropTargetForElements({
      element: ref.current,
      getData: () => createBoardData(boardId),
      onDrop: ({ location }) => {
        const board = findDropTarget(location.current.dropTargets, isBoardData);

        if (!board) return;
      },
    });
  }, [boardId]);

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
