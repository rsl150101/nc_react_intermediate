import styled from "styled-components";
import { useGetNowPlayingQuery } from "../features/movies/moviesApi";
import { makeImagePath } from "../utils/imageUtils";

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

function Home() {
  const { data, isLoading } = useGetNowPlayingQuery();
  return (
    <WrapperDiv>
      {isLoading ? (
        <LoaderDiv>Loading...</LoaderDiv>
      ) : (
        <>
          <BannerDiv $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <MovieTitle>{data?.results[0].title}</MovieTitle>
            <MovieOverview>{data?.results[0].overview}</MovieOverview>
          </BannerDiv>
        </>
      )}
    </WrapperDiv>
  );
}

export default Home;
