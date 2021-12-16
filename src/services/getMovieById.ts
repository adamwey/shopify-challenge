import { formatMovie } from '../utils/formatMovie';

const apiKey = import.meta.env.VITE_OMDB_API_KEY;

export async function getMovieById(id: string): Promise<MovieData> {
  const url = `https://www.omdbapi.com/?i=${id}&type=movie&r=json&plot=short&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return formatMovie(data);
}
