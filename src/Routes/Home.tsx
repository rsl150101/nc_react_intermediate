import { useGetNowPlayingQuery } from "../features/movies/moviesApi";

function Home() {
  const { data, isLoading } = useGetNowPlayingQuery();
  return <div style={{ height: "200vh", backgroundColor: "white" }}></div>;
}

export default Home;
