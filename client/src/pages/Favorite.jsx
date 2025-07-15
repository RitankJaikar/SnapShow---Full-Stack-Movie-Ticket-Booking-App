import React from 'react'
import { BlurCircle, MovieCard, Spacer } from '../components'
import { dummyShowsData } from '../assets/assets'
import { useAppContext } from '../context/AppContext';

const Favorite = () => {
  const { favoriteMovies } = useAppContext();

  return favoriteMovies.length > 0 ? (
    <div className='relative px-6 md:px-16 lg:px-24 xl:px-44'>
      <BlurCircle top='150px' right='0px' />
      <BlurCircle bottom='50px' left='50px' />
      <Spacer height='8rem' />
      <h1 className='text-2xl sm:text-3xl font-semibold text-white text-center'>Your Favorites</h1>
      <div className='flex justify-center flex-wrap gap-8 mt-8'>
        {favoriteMovies.map(show => (
          <MovieCard key={show._id} movie={show} />
        ))}
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center h-[60vh] text-gray-400 text-lg'>
      No movies available.
    </div>
  )
}

export default Favorite