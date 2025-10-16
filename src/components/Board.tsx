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
  const toDos = useAppSelector((state) => state.toDo);

  return (
    <BoardDiv>
      {toDos.map((toDo, index) => (
        <Card key={toDo.id} index={index} content={toDo.content} />
      ))}
    </BoardDiv>
  );
};

export default Board;
