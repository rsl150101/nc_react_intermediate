import { useEffect, useRef } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import styled from "styled-components";
import Card from "./Card";

const BoardDiv = styled.div`
  padding: 30px 10px 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const toDos = ["a", "b", "c", "d", "e", "f"];

const Board = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return dropTargetForElements({
      element: ref.current,
    });
  }, []);
  return (
    <BoardDiv ref={ref}>
      {toDos.map((toDo) => (
        <Card key={toDo} content={toDo} />
      ))}
    </BoardDiv>
  );
};

export default Board;
