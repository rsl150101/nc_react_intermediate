import styled from "styled-components";
import { motion } from "motion/react";
import { useState } from "react";

const WrapperDiv = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Box = styled(motion.div)<{ $clicked: boolean }>`
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: ${(props) => (props.$clicked ? "center" : "flex-start")};
  align-items: ${(props) => (props.$clicked ? "center" : "flex-start")};
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 100px;
  width: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  border-radius: 50%;
`;

function App() {
  const [clicked, setClicked] = useState(false);

  const handleClicked = () => {
    setClicked((prev) => !prev);
  };

  return (
    <WrapperDiv onClick={handleClicked}>
      <Box $clicked={clicked}>
        <Circle layout />
      </Box>
    </WrapperDiv>
  );
}

export default App;
