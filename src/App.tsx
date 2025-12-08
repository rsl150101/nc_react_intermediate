import styled from "styled-components";

import DeleteZone from "./components/DeleteZone";
import Boards from "./components/Boards";

const WrapperDiv = styled.div`
  display: flex;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  return (
    <>
      <WrapperDiv>
        <Boards />
        <DeleteZone />
      </WrapperDiv>
    </>
  );
}

export default App;
