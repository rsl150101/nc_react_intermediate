import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const rotateionAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotateionAnimation} 1s linear infinite;
  ${Emoji}:hover {
    font-size: 50px;
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji>❌</Emoji>
      </Box>
    </Wrapper>
  );
}

export default App;
