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
  invisible: { x: 500, opacity: 0, scale: 0 },
  visible: { x: 0, opacity: 1, scale: 1, transition: { duration: 1 } },
  hidden: { x: -500, opacity: 0, scale: 0, transition: { duration: 1 } },
};

function App() {
  const [visible, setVisible] = useState(1);

  const nextSlider = () => setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  const prevSlider = () => setVisible((prev) => (prev === 1 ? 1 : prev - 1));

  return (
    <WrapperDiv>
      <button onClick={prevSlider}>prev</button>
      <button onClick={nextSlider}>next</button>
      <AnimatePresence>
        {Array.from({ length: 10 }, (_v, i) => i + 1).map((i) =>
          i === visible ? (
            <Box
              variants={boxVariants}
              initial="invisible"
              animate={"visible"}
              exit="hidden"
              key={i}
            >
              {i}
            </Box>
          ) : null
        )}
      </AnimatePresence>
    </WrapperDiv>
  );
}

export default App;
