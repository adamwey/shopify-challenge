import { SearchIcon } from './icons';

interface SearchProps {
  onSubmit: any;
  query: string;
  setQuery: (s: string) => void;
  clearSearch: () => void;
}

export function Search({ onSubmit, query, setQuery, clearSearch }: SearchProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(query);
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setQuery(e.currentTarget.value);
  }

  return (
    <div className='flex flex-col p-4 space-y-4 border rounded-md border-grey-700 bg-grey-900'>
      <h2 className='font-semibold'>Movie search</h2>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <div className='flex items-center overflow-hidden bg-black border rounded-md bg-opacity-[55%] border-grey-700 focus-within:border-blue-500 focus-within:ring'>
          <span className='mx-3'>
            <SearchIcon />
          </span>
          <input
            type='text'
            value={query}
            onChange={handleChange}
            name='query'
            className='w-full h-12 bg-transparent placeholder-grey-600 focus:outline-none'
            placeholder='Star Wars: Rogue One'
          />
        </div>
        <div className='flex items-center self-end mt-4 space-x-4'>
          <button
            type='button'
            className='h-8 px-3 transition duration-200 rounded-full hover:text-green-500'
            onClick={clearSearch}
          >
            clear
          </button>
          <div className='relative group'>
            <div className='absolute w-full -inset-0.2 opacity-0 group-hover:opacity-75 duration-200 transition bg-green-600 blur rounded-md h-8 px-3' />
            <button className='relative h-8 px-3 transition-colors duration-150 ease-in-out bg-green-500 rounded-md'>
              search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
