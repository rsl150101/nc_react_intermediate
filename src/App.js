import styled from "styled-components";

const Title = styled.h1`
  color: ${(prop) => prop.theme.textColor};
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${(prop) => prop.theme.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Wrapper>
      <Title>Hello</Title>
    </Wrapper>
  );
}

export default App;
