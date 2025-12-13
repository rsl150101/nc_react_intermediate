import styled from "styled-components";
import { motion, type Variants } from "motion/react";
import { useRef } from "react";

const WrapperDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
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

const boxVariants: Variants = {
  hover: { rotateZ: 90 },
  click: { borderRadius: "50%" },
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);

  return (
    <WrapperDiv>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          variants={boxVariants}
          drag
          dragSnapToOrigin
          dragElastic={0.000001}
          dragConstraints={biggerBoxRef}
          whileHover="hover"
          whileTap="click"
        />
      </BiggerBox>
    </WrapperDiv>
  );
}

export default App;
