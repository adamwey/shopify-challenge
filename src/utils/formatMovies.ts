export const formatMovies = (movies: any[]): PartialMovieData[] =>
  movies.map((movie) => ({
    imdbID: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
    type: movie.Type,
  }));
