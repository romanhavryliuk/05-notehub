import axios from "axios";
import type { Movie } from "../types/movie";

export interface FetchMoviesResponse {
    results: Movie[];
    total_pages?: number;
    page?: number;
}

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string, page: number): Promise<FetchMoviesResponse> => {
    const response = await axios.get<FetchMoviesResponse>(`https://api.themoviedb.org/3/search/movie`,
        {
            params: {
                query,
                page,
            },
            headers: {
                Authorization: `Bearer ${TMDB_TOKEN}`
            },
        }
    );
    return response.data;

}