import styled from "styled-components";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";

const WrapperDiv = styled(motion.div)`
  width: 100vw;
  height: 200vh;
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
  const [windowWidthSize, setWindowWidthSize] = useState(window.innerWidth / 2);
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-windowWidthSize, 0, windowWidthSize], [-360, 0, 360]);
  const gradient = useTransform(
    x,
    [-windowWidthSize, windowWidthSize],
    [
      "linear-gradient(135deg, rgb(0,210,238), rgb(0,83,238))",
      "linear-gradient(135deg, rgb(0,238,155), rgb(67, 238, 0))",
    ]
  );
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidthSize(window.innerWidth / 2);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WrapperDiv style={{ background: gradient }}>
      <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin />
    </WrapperDiv>
  );
}

export default App;
