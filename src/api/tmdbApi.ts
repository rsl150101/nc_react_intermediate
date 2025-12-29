import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: (headers) => {
      const token = process.env.REACT_APP_TMDB_API_TOKEN;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Movie", "Tv"],
  endpoints: () => ({}),
});

export default tmdbApi;
