import styled from "styled-components";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";

const WrapperDiv = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants: Variants = {
  initial: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, rotateZ: 360 },
  hidden: { opacity: 0, scale: 0, y: 50 },
};

function App() {
  const [showing, setShowing] = useState(false);

  const toggleShowing = () => setShowing((prev) => !prev);

  return (
    <WrapperDiv>
      <button onClick={toggleShowing}>Click</button>
      <AnimatePresence>
        {showing ? (
          <Box variants={boxVariants} initial="initial" animate="visible" exit="hidden" />
        ) : null}
      </AnimatePresence>
    </WrapperDiv>
  );
}

export default App;
