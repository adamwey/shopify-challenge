import { Movie } from './';

interface NominationsProps {
  nominations: PartialMovieData[];
  removeNomination: (id: string) => void;
  resetNominations: () => void;
  saveNominations: () => void;
}

export function Nominations({
  nominations,
  removeNomination,
  saveNominations,
  resetNominations,
}: NominationsProps) {
  return (
    <div className='sticky flex flex-col w-full h-full max-w-sm p-4 border rounded-md top-10 border-grey-700 bg-grey-900'>
      <div className='mb-4'>
        <h2 className='font-semibold'>Your nominations</h2>
        <p className='text-sm text-grey-400'>
          click on a movie title to learn more about it
        </p>
      </div>

      <div className='space-y-8'>
        {nominations.map((movie) => (
          <Movie
            key={movie.imdbID}
            action='REMOVE'
            movie={movie}
            onClick={() => removeNomination(movie.imdbID)}
          />
        ))}
      </div>

      <div className='w-full pt-4 mt-8 space-x-4 text-right border-t border-grey-700'>
        <button
          className='h-8 px-3 bg-black rounded-md hover:bg-opacity-25'
          onClick={resetNominations}
        >
          reset
        </button>
        <button
          className='h-8 px-3 bg-green-500 rounded-md hover:bg-green-400'
          onClick={saveNominations}
        >
          save
        </button>
      </div>
    </div>
  );
}
