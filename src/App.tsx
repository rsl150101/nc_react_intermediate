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

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Box = styled(motion.div)`
  height: 300px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OverlayBox = styled(Box)`
  width: 400px;
  height: 400px;
`;

const overlayVariants: Variants = {
  hidden: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  visible: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  exit: {
    backgroundColor: "rgba(0,0,0,0)",
  },
};

function App() {
  const [clicked, setClicked] = useState(false);

  const handleClicked = () => {
    setClicked((prev) => !prev);
  };

  return (
    <WrapperDiv onClick={handleClicked}>
      <GridDiv>
        <Box layoutId="clicked" />
        <Box />
        <Box />
        <Box />
      </GridDiv>
      <AnimatePresence>
        {clicked ? (
          <Overlay variants={overlayVariants} initial="hidden" animate="visible" exit="exit">
            <OverlayBox layoutId="clicked" />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </WrapperDiv>
  );
}

export default App;
