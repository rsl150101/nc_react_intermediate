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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants: Variants = {
  entry: (isBack: boolean) => ({ x: isBack ? -500 : 500, opacity: 0, scale: 0 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: (isBack: boolean) => ({
    x: isBack ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: { duration: 0.3 },
    rotateX: 90,
  }),
};

function App() {
  const [visible, setVisible] = useState(1);
  const [isBack, setIsBack] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const nextSlider = () => {
    if (leaving) return;
    setLeaving(true);
    setIsBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
    if (visible === 10) setLeaving(false);
  };

  const prevSlider = () => {
    if (leaving) return;
    setLeaving(true);
    setIsBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
    if (visible === 1) setLeaving(false);
  };

  const onAnimationEnd = () => {
    setLeaving(false);
  };

  return (
    <WrapperDiv>
      <button onClick={prevSlider}>prev</button>
      <button onClick={nextSlider}>next</button>
      <AnimatePresence custom={isBack} onExitComplete={onAnimationEnd}>
        <Box
          custom={isBack}
          variants={boxVariants}
          initial="entry"
          animate="center"
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
    </WrapperDiv>
  );
}

export default App;
