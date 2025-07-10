import ReactPlayer from 'react-player';
import { dummyTrailers } from '../assets/assets';
import { BlurCircle } from '.'
import React, { useState } from 'react'
import { PlayCircleIcon } from 'lucide-react';

const TrailersSection = () => {
    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

    return (
        <div className='px-6 md:px-16 1g:px-24 xl:px-44 py-20'>
            <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>Trailers</p>
            <div className='relative mt-6'>
                <BlurCircle top='-100px' right='-100px' />
                <BlurCircle bottom='-100px' left='-100px' />
                <div className="relative w-full max-w-[960px] aspect-video mx-auto">
                    <ReactPlayer
                        url={currentTrailer.videoUrl}
                        controls={false}
                        className="absolute top-0 left-0"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
            <div className='group grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto'>
                {dummyTrailers.map((trailer) => (
                    <div
                        key={trailer.image}
                        onClick={() => setCurrentTrailer(trailer)}
                        className='relative aspect-video group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition cursor-pointer'
                    >
                        <img
                            src={trailer.image}
                            alt="trailer"
                            className='rounded-lg w-full h-full object-cover brightness-75'
                        />
                        <PlayCircleIcon
                            strokeWidth={1.6}
                            className='absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrailersSection