import { useState } from "react";
import { useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie.ts";
import { fetchMovies } from "../../services/movieService.ts";

import SearchBar from "../SearchBar/SearchBar.tsx";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";
import css from "./App.module.css";
import ReactPaginate from "react-paginate";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", searchQuery, page],
    queryFn: () => fetchMovies(searchQuery, page),
    enabled: searchQuery.length > 0,
    placeholderData: keepPreviousData,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const totalPages = data?.total_pages || 0;

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong. Please try again.");
    }
    if (data?.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isError, data]);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <main>
        {error && <ErrorMessage />}
        {isLoading && <Loader />}
        {totalPages > 1 && (
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}
        {isSuccess && (
          <MovieGrid movies={data?.results} onSelect={handleOpenModal} />
        )}
      </main>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      <Toaster position="top-center" />
    </>
  );
}

export default App;
