import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Nominations, Search, SearchResults, Header } from './components';
import { getMovieByTitle } from './services';

const NOMINATION_KEY = 'SHOPPIES_NOMINATIONS';
const MAX_NOMINATIONS = 5;

const notify = (message: string) => toast(message);

function App() {
  const [movies, setMovies] = useState<PartialMovieData[]>([]);
  const [nominations, setNominations] = useState<PartialMovieData[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // window.addEventListener('beforeunload', () => {
  //   saveNominations();
  // });

  useEffect(() => {
    const savedNominations = getSavedNominations();
    if (savedNominations) {
      setNominations(JSON.parse(savedNominations));
    }
  }, []);

  function saveNominations() {
    localStorage.setItem(NOMINATION_KEY, JSON.stringify(nominations));
    notify('Your nominations have been saved! 🎉');
  }

  function resetNominations() {
    setNominations([]);
    localStorage.removeItem(NOMINATION_KEY);
    notify('Your nominations have been reset.');
  }

  function getSavedNominations() {
    return localStorage.getItem(NOMINATION_KEY);
  }

  function handleSubmit() {
    setIsLoading(true);

    getMovieByTitle(query).then((data) => {
      setMovies(data);
      setIsLoading(false);
    });
  }

  function clearSearch() {
    setQuery('');
    setMovies([]);
  }

  function isNominated(id: string) {
    return nominations.some((nominee) => nominee.imdbID === id);
  }

  function addNomination(movie: PartialMovieData) {
    if (nominations.length === MAX_NOMINATIONS) {
      notify("You've selected all your nominations");
      return;
    }

    if (isNominated(movie.imdbID)) return;

    setNominations((nominees) => [...nominees, movie]);
  }

  function removeNomination(id: string) {
    if (!isNominated(id)) return;

    setNominations(nominations.filter((nominee) => nominee.imdbID !== id));
  }

  return (
    <main className='bg-black bg-opacity-[95%] min-h-screen text-grey-100'>
      <div className='max-w-screen-lg py-12 mx-auto space-y-8'>
        <Header />

        <div className='flex space-x-4'>
          <div className='flex flex-col flex-1 space-y-4'>
            <Search
              query={query}
              onSubmit={handleSubmit}
              setQuery={setQuery}
              clearSearch={clearSearch}
            />

            <SearchResults
              movies={movies}
              isLoading={isLoading}
              addNomination={addNomination}
              activeDisabled
              isNominated={isNominated}
            />
          </div>

          <Nominations
            nominations={nominations}
            removeNomination={removeNomination}
            resetNominations={resetNominations}
            saveNominations={saveNominations}
          />
        </div>
      </div>

      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            backgroundColor: '#84CC17',
            color: 'white',
          },
        }}
      />
    </main>
  );
}

export default App;
