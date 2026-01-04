import styled from "styled-components";
import { useGetNowPlayingQuery } from "../features/movies/moviesApi";
import { makeImagePath } from "../utils/imageUtils";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

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
  :first-child {
    transform-origin: left center;
  }
  :last-child {
    transform-origin: right center;
  }
`;

const SliderBox = styled(motion.div)<{ $bgPhoto: string }>`
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
  cursor: pointer;
`;

const SliderBoxInfo = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const SliderBoxModal = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  background-color: red;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const Overlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
`;

const sliderVariants: Variants = {
  hidden: { x: "calc(100% + 10px)" },
  visible: { x: 0 },
  exit: { x: "calc(-100% - 10px)" },
};

const sliderBoxVariants: Variants = {
  hover: {
    scale: 1.3,
    transition: {
      delay: 0.5,
      duration: 0.3,
    },
  },
};

const sliderBoxInfoVariants: Variants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
    },
  },
};

const offset = 6;

function Home() {
  const { data, isLoading } = useGetNowPlayingQuery();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const movieModalMatch = useMatch("/movies/:movieId");
  const navigate = useNavigate();

  const increaseIndex = () => {
    if (leaving) return;
    setLeaving(true);
    if (data) {
      const totalMoviesLength = data.results.length - 1;
      const maxIndex = Math.floor(totalMoviesLength / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const handleClickSliderBox = (movieId: number) => () => {
    navigate(`/movies/${movieId}`);
  };

  const handleClickOverlay = () => {
    navigate("/", { replace: true });
  };

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
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <SliderRow
                key={index}
                variants={sliderVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(1)
                  .slice(index * offset, index * offset + offset)
                  .map((movie) => (
                    <SliderBox
                      key={movie.id}
                      $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      variants={sliderBoxVariants}
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      onClick={handleClickSliderBox(movie.id)}
                      layoutId={String(movie.id)}
                    >
                      <SliderBoxInfo variants={sliderBoxInfoVariants}>
                        <h4>{movie.title}</h4>
                      </SliderBoxInfo>
                    </SliderBox>
                  ))}
              </SliderRow>
            </AnimatePresence>
          </MovieSliderDiv>
          <AnimatePresence>
            {movieModalMatch ? (
              <>
                <Overlay
                  onClick={handleClickOverlay}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <SliderBoxModal layoutId={movieModalMatch.params.movieId}></SliderBoxModal>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </WrapperDiv>
  );
}

export default Home;
