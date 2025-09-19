import axios from "axios";
import type { Movie } from "../types/movie";

export interface SearchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number; // ← важливо для пагінації
  total_results: number;
}

const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string | undefined;

if (!TOKEN) {
  console.error(
    "[TMDB] Missing VITE_TMDB_TOKEN. Додай його в .env локально і в Vercel Env (Preview/Production), потім Redeploy."
  );
}

export const TMDB = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : undefined,
});

export async function fetchMovies(
  query: string,
  page: number
): Promise<SearchMoviesResponse> {
  const { data } = await TMDB.get<SearchMoviesResponse>("/search/movie", {
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
  });
  return data;
}
