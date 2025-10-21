import styled from "styled-components";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef } from "react";

import Card from "./Card";
import { CardState } from "../reducers/toDo";
import { BOARDDROPTYPE } from "../constants/dnd";

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
      getData: () => ({ type: BOARDDROPTYPE, boardId }),
      onDrop: ({ location }) => {
        const board = location.current.dropTargets.find(
          (t) => t.data.type === BOARDDROPTYPE
        );

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
