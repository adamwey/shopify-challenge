import { useState } from 'react';
import clsx from 'clsx';

import { MovieModal } from './';
import { PlusIcon, XIcon } from './icons';

interface MovieProps {
  movie: PartialMovieData;
  onClick: () => void;
  action: 'ADD' | 'REMOVE';
}

export function Movie({
  movie,
  onClick,
  action,
  disabled,
}: MovieProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className='flex items-center space-x-4'>
        <button
          className={clsx(
            'flex items-center justify-center flex-none w-6 h-6 font-black transition-colors duration-150 ease-in-out rounded-full text-grey-100',
            {
              'bg-grey-500 cursor-not-allowed': disabled,
              'bg-green-500 hover:bg-green-400': action === 'ADD' && !disabled,
              'bg-red-500 hover:bg-red-400': action === 'REMOVE' && !disabled,
            }
          )}
          onClick={onClick}
          disabled={disabled}
        >
          {action === 'ADD' ? <PlusIcon /> : <XIcon />}
        </button>

        <button
          type='button'
          onClick={openModal}
          className='flex space-x-4 text-sm rounded'
        >
          <span className='flex flex-col items-start'>
            <p className='text-sm'>{movie.title}</p>
            <p className='text-xs text-grey-400'>{movie.year}</p>
          </span>
        </button>
      </div>

      <MovieModal isOpen={isOpen} closeModal={closeModal} movieId={movie.imdbID} />
    </>
  );
}
