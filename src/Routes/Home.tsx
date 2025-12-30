import styled from "styled-components";
import { useGetNowPlayingQuery } from "../features/movies/moviesApi";
import { makeImagePath } from "../utils/imageUtils";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";

const WrapperDiv = styled.div`
  background-color: ${(props) => props.theme.black.darker};
`;

const LoaderDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerDiv = styled.div<{ $bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

const MovieTitle = styled.h2`
  font-size: 68px;
  text-indent: 30px;
  margin-bottom: 20px;
`;

const MovieOverview = styled.p`
  width: 50%;
  font-size: 30px;
`;

const MovieSliderDiv = styled.div`
  position: relative;
  top: -100px;
`;

const SliderRow = styled(motion.div)`
  height: 200px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
`;
const SliderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-size: 66px;
  color: red;
`;

const sliderVariants: Variants = {
  hidden: { x: window.outerWidth + 20 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 20 },
};

function Home() {
  const { data, isLoading } = useGetNowPlayingQuery();
  const [index, setIndex] = useState(0);

  const increaseIndex = () => setIndex((prev) => prev + 1);

  return (
    <WrapperDiv>
      {isLoading ? (
        <LoaderDiv>Loading...</LoaderDiv>
      ) : (
        <>
          <BannerDiv
            $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
            onClick={increaseIndex}
          >
            <MovieTitle>{data?.results[0].title}</MovieTitle>
            <MovieOverview>{data?.results[0].overview}</MovieOverview>
          </BannerDiv>
          <MovieSliderDiv>
            <AnimatePresence>
              <SliderRow
                key={index}
                variants={sliderVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween" }}
              >
                {Array.from({ length: 6 }, (_v, i) => i + 1).map((i) => (
                  <SliderBox>{i}</SliderBox>
                ))}
              </SliderRow>
            </AnimatePresence>
          </MovieSliderDiv>
        </>
      )}
    </WrapperDiv>
  );
}

export default Home;
