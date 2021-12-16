type PartialMovieData = {
  title: string;
  poster: string;
  type: string;
  year: string;
  imdbID: string;
};

type MovieData = {
  released: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  awards: string;
  imdbRating: string;
  rated: string;
} & PartialMovieData;
