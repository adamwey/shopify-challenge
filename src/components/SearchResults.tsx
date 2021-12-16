import { Movie, LoadingSpinner } from './';

interface SearchResultsProps {
  movies: PartialMovieData[];
  isLoading: boolean;
  addNomination: (movie: PartialMovieData) => void;
  activeDisabled: boolean;
  isNominated: (id: string) => boolean;
}

export function SearchResults({
  movies,
  isLoading,
  addNomination,
  activeDisabled = false,
  isNominated,
}: SearchResultsProps) {
  return (
    <div className='flex flex-col p-4 border rounded-md border-grey-700 bg-grey-900'>
      <div className='mb-4'>
        <h2 className='font-semibold'>Search results will appear here</h2>

        <p className='text-sm text-grey-400'>
          click on a movie title to learn more about it
        </p>
      </div>

      {isLoading && <LoadingSpinner />}

      {movies.length > 0 && (
        <div className='space-y-8'>
          {movies?.map((movie) => (
            <Movie
              key={movie.imdbID}
              movie={movie}
              action='ADD'
              onClick={() => addNomination(movie)}
              disabled={activeDisabled && isNominated(movie.imdbID)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
