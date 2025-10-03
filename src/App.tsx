import styled from "styled-components";

import Board from "./components/Board";

const WrapperDiv = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BoardsDiv = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

function App() {
  return (
    <>
      <WrapperDiv>
        <BoardsDiv>
          <Board />
        </BoardsDiv>
      </WrapperDiv>
    </>
  );
}

export default App;
