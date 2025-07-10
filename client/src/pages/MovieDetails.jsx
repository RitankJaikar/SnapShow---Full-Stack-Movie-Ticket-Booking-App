import { ArrowRight, Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import timeFormat from '../lib/timeFormat'
import { BlurCircle, DateSelect, Loading, MovieCard } from '../components'
import handleAnchorClick from "../lib/handleAnchorClick"

const MovieDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [show, setShow] = useState(null)

  const getShow = async () => {
    const show = dummyShowsData.find(show => show._id === id)
    if(show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData
      })
    }
  }

  useEffect(() => {
    getShow()
  }, [id])

  const scrollRef = useRef(null)
  let isDown = false
  let startX
  let scrollLeft

  const handleMouseDown = (e) => {
    isDown = true
    scrollRef.current.classList.add('cursor-grabbing')
    startX = e.pageX - scrollRef.current.offsetLeft
    scrollLeft = scrollRef.current.scrollLeft
  }

  const handleMouseLeave = () => {
    isDown = false
    scrollRef.current.classList.remove('cursor-grabbing')
  }

  const handleMouseUp = () => {
    isDown = false
    scrollRef.current.classList.remove('cursor-grabbing')
  }

  const handleMouseMove = (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2 // scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return show
    ? <div className='px-6 md:px-16 lg:px-36 pt-30 lg:pt-50'>
        <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
          <img src={show.movie.poster_path} alt="" className='max-md:mx-auto rounded-x1 h-104 max-w-70 object-cover' />
          <div className='relative flex flex-col gap-3'>
            <BlurCircle top="-100px" left="-100px" />
            <p className='text-primary'>ENGLISH</p>
            <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.
              title}</h1>
            <div className='flex items-center gap-2 text-gray-300'>
              <StarIcon className='w-5 h-5 text-primary fill-primary' />
              {show.movie.vote_average.toFixed(1)} User Rating
            </div>
            <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>
              {show.movie.overview}
            </p>
            <p>
              {timeFormat(show.movie.runtime)} • {show.movie.genres.map(genre => genre.name).join(", ")} • {show.movie.release_date.split("-")[0]}
            </p>
            <div className='flex items-center flex-wrap gap-4 mt-4'>
              <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
                <PlayCircleIcon className="w-5 h-5" />
                Watch Trailer
              </button>
              <a href="#dateSelect" onClick={handleAnchorClick} className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'>Buy Tickets</a>
              <button className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
                <Heart className={`w-5 h-5`} />
              </button>
            </div>
          </div>
        </div>

        <p className='text-lg font-medium mt-20'>Cast</p>
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className='overflow-x-auto no-scrollbar mt-8 pb-4 cursor-grab select-none'
        >
          <div className='flex items-center gap-4 w-max px-4'>
            {show.movie.casts.slice(0, 12).map((cast, index) => (
              <div key={index} className='flex flex-col items-center text-center'>
                <img src={cast.profile_path} alt="" className='rounded-full h-20 md:h-20 aspect-square object-cover'/>
                <p className="mt-2 text-sm text-gray-300 max-w-[6rem] truncate">{cast.name}</p>
              </div>
            ))}
          </div>
        </div>

        <DateSelect dateTime={show.dateTime} id={id} />

        <div className='relative flex items-center justify-between pt-20 pb-10'>
          <p className='text-gray-300 font-medium text-lg'>You May ALso Like</p>
          <button onClick={() => {navigate('/movies'); scrollTo(0, 0);}} className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer'>
              View All
              <ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5'/>
          </button>
        </div>
        <div className='flex justify-center flex-wrap gap-8 mt-8'>
            {dummyShowsData.slice(0,3).map(show => <MovieCard key={show._id} movie={show} />)}
        </div>
        <div className='flex justify-center mt-20'>
            <button onClick={()=> {navigate('/movies'); scrollTo(0,0);}}
            className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>Show more</button>
        </div>
      </div>
    : <div>
        <Loading />
      </div>
}

export default MovieDetails