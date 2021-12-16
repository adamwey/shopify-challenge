import { formatMovies } from '../utils/formatMovies';

const apiKey = import.meta.env.VITE_OMDB_API_KEY;

export async function getMovieByTitle(
  searchTerm: string
): Promise<PartialMovieData[]> {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${searchTerm}`;
  const response = await fetch(url);
  const data = await response.json();
  return data ? formatMovies(data.Search) : [];
}
