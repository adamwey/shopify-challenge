import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { StarIcon } from './icons';
import { getMovieById } from '../services';
import { LoadingSpinner } from '.';

interface MovieModalProps {
  isOpen: boolean;
  closeModal: () => void;
  movieId: string;
}

export function MovieModal({ isOpen, closeModal, movieId }: MovieModalProps) {
  const [movieData, setMovie] = useState<MovieData>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setIsLoading(true);
    getMovieById(movieId).then((data) => {
      setMovie(data);
      setIsLoading(false);
    });
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={closeModal}
      >
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='inline-block h-screen align-middle' aria-hidden='true'>
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left text-white align-middle transition-all transform border rounded border-grey-800 bg-grey-900'>
              {isLoading && <LoadingSpinner />}

              {movieData && (
                <div className='flex space-x-4'>
                  <div>
                    <img
                      src={movieData?.poster}
                      className='w-52'
                      alt={movieData?.title}
                    />
                  </div>
                  <div className='flex flex-col w-full'>
                    <div className='w-full'>
                      <div className='flex items-center justify-between'>
                        <Dialog.Title as='h2' className='text-lg font-semibold'>
                          {movieData?.title}
                        </Dialog.Title>
                        <span className='flex items-center text-sm text-grey-500'>
                          <StarIcon />
                          {movieData?.imdbRating}
                        </span>
                      </div>
                      <div>
                        <p className='text-xs text-grey-400'>
                          Released - {movieData?.released}
                        </p>
                      </div>
                    </div>

                    <table className='mt-6 table-auto'>
                      <tbody className='flex flex-col space-y-2'>
                        <tr className='flex'>
                          <td className='inline-block w-20 mr-4 text-xs font-bold tracking-wide uppercase'>
                            Plot
                          </td>
                          <td className='w-full'>{movieData?.plot}</td>
                        </tr>

                        <tr className='flex'>
                          <td className='inline-block w-20 mr-4 text-xs font-bold tracking-wide uppercase'>
                            Actors
                          </td>
                          <td className='w-full'>{movieData?.actors}</td>
                        </tr>

                        <tr className='flex'>
                          <td className='inline-block w-20 mr-4 text-xs font-bold tracking-wide uppercase'>
                            Awards
                          </td>
                          <td className='w-full'>{movieData?.awards}</td>
                        </tr>

                        <tr className='flex'>
                          <td className='inline-block w-20 mr-4 text-xs font-bold tracking-wide uppercase'>
                            Director
                          </td>
                          <td className='w-full'>{movieData?.director}</td>
                        </tr>

                        <tr className='flex'>
                          <td className='inline-block w-20 mr-4 text-xs font-bold tracking-wide uppercase'>
                            Writers
                          </td>
                          <td className='w-full'>{movieData?.writer}</td>
                        </tr>

                        <tr className='flex'>
                          <td className='inline-block w-20 mr-4 text-xs font-bold tracking-wide uppercase'>
                            Genre
                          </td>
                          <td className='w-full'>{movieData?.genre}</td>
                        </tr>

                        <tr className='flex'>
                          <td className='inline-block w-20 mr-4 text-xs font-bold tracking-wide uppercase'>
                            Rated
                          </td>
                          <td className='w-full'>{movieData?.rated}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className='flex items-center justify-end pt-4 mt-4 space-x-4 border-t border-grey-800'>
                      <a
                        href={`https://imdb.com/title/${movieData?.imdbID}`}
                        target='_blank'
                        className='transition-all duration-150 hover:text-lime-500 hover:underline'
                      >
                        IMDb
                      </a>

                      <button
                        className='px-4 py-1 transition-colors duration-150 rounded-full bg-lime-500 hover:bg-lime-400'
                        onClick={closeModal}
                      >
                        done
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
