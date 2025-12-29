import tmdbApi from "../../api/tmdbApi";
import { MovieResponse } from "./types";

const moviesApi = tmdbApi.injectEndpoints({
  endpoints: (builder) => ({
    getNowPlaying: builder.query<MovieResponse, void>({
      query: () => "movie/now_playing",
      providesTags: ["Movie"],
    }),
  }),
});

export const { useGetNowPlayingQuery } = moviesApi;
