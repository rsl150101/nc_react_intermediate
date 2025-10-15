import { useEffect, useRef } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import styled from "styled-components";
import Card from "./Card";
import { useAppSelector } from "../store/hooks";

const BoardDiv = styled.div`
  padding: 30px 10px 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Board = () => {
  const ref = useRef<HTMLDivElement>(null);
  const toDos = useAppSelector((state) => state.toDo);

  useEffect(() => {
    if (!ref.current) return;
    return dropTargetForElements({
      element: ref.current,
    });
  }, []);

  return (
    <BoardDiv ref={ref}>
      {toDos.map((toDo) => (
        <Card key={toDo.id} content={toDo.content} />
      ))}
    </BoardDiv>
  );
};

export default Board;
