import styled from "styled-components";
import { motion, type Variants } from "motion/react";

const WrapperDiv = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HtmlLogoSvg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: white;
    stroke-width: 2;
  }
`;

const svgVariants: Variants = {
  start: {
    pathLength: 0,
    fill: "rgba(255,255,255,0)",
  },
  end: {
    pathLength: 1,
    fill: "rgba(255,255,255,1)",
  },
};

function App() {
  return (
    <WrapperDiv>
      <HtmlLogoSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <motion.path
          variants={svgVariants}
          initial="start"
          animate="end"
          transition={{ default: { duration: 5 }, fill: { duration: 1, delay: 2 } }}
          d="M0 32L34.9 427.8 191.5 480 349.1 427.8 384 32 0 32zM308.2 159.9l-183.8 0 4.1 49.4 175.6 0-13.6 148.4-97.9 27 0 .3-1.1 0-98.7-27.3-6-75.8 47.7 0 3.5 38.1 53.5 14.5 53.7-14.5 6-62.2-166.9 0-12.8-145.6 241.1 0-4.4 47.7z"
        />
      </HtmlLogoSvg>
    </WrapperDiv>
  );
}

export default App;
