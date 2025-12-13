import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent } from "motion/react";

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
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const x = useMotionValue(0);

  useMotionValueEvent(x, "change", (latest) => {
    console.log(latest);
  });

  return (
    <WrapperDiv>
      <Box style={{ x }} drag="x" dragSnapToOrigin />
    </WrapperDiv>
  );
}

export default App;
