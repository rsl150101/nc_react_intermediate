import styled from "styled-components";
import { useGetNowPlayingQuery } from "../features/movies/moviesApi";
import { makeImagePath } from "../utils/imageUtils";
import { AnimatePresence, motion, useScroll, type Variants } from "motion/react";
import { useEffect, useState } from "react";
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

const SliderBox = styled(motion.div)`
  font-size: 66px;
  cursor: pointer;
`;

const SliderBoxImg = styled(motion.div)<{ $bgPhoto: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: 100% 100%;
  background-position: center center;
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
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const ModalImg = styled(motion.div)`
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center center;
`;

const ModalTitle = styled.h3`
  font-size: 46px;
  position: relative;
  top: -100px;
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
`;

const ModalDescription = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.darker};
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
  hidden: (windowWidth: number) => ({ x: windowWidth + 10 }),
  visible: { x: 0 },
  exit: (windowWidth: number) => ({ x: -windowWidth - 10 }),
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const clickedSliderBox =
    movieModalMatch?.params.movieId &&
    data?.results.find((movie) => String(movie.id) === movieModalMatch.params.movieId);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
                custom={windowWidth}
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
                      variants={sliderBoxVariants}
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      onClick={handleClickSliderBox(movie.id)}
                      layoutId={String(movie.id)}
                    >
                      <SliderBoxImg
                        layoutId={movie.backdrop_path}
                        $bgPhoto={makeImagePath(movie.poster_path)}
                        transition={{ type: "tween" }}
                      />
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
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <SliderBoxModal
                  layoutId={movieModalMatch.params.movieId}
                  style={{ top: scrollY.get() + 100 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "tween" }}
                >
                  {clickedSliderBox && (
                    <>
                      <ModalImg
                        layoutId={clickedSliderBox.backdrop_path}
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedSliderBox.backdrop_path,
                            "w500"
                          )})`,
                          originX: 0.5,
                          originY: 0.5,
                        }}
                        transition={{ type: "tween" }}
                      />
                      <ModalTitle>{clickedSliderBox.title}</ModalTitle>
                      <ModalDescription>{clickedSliderBox.overview}</ModalDescription>
                    </>
                  )}
                </SliderBoxModal>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </WrapperDiv>
  );
}

export default Home;
