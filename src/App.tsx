import styled from "styled-components";

import Board from "./components/Board";
import { useAppSelector } from "./store/hooks";

const WrapperDiv = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BoardsDiv = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const toDos = useAppSelector((state) => state.toDo);

  return (
    <>
      <WrapperDiv>
        <BoardsDiv>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
          ))}
        </BoardsDiv>
      </WrapperDiv>
    </>
  );
}

export default App;
