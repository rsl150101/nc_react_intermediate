import styled from "styled-components";
import { motion } from "motion/react";

const WrapperDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const myVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 360, transition: { delay: 0.5 } },
};

function App() {
  return (
    <WrapperDiv>
      <Box variants={myVars} initial={"start"} animate={"end"} />
    </WrapperDiv>
  );
}

export default App;
