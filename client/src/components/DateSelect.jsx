import React, { useState } from 'react'
import { BlurCircle } from '.'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({ dateTime, id }) => {
    const [selected, setSelected] = useState(null)
    const navigate = useNavigate()

    const onBookHandler = () => {
        if(!selected) {
            return toast('Please select a date')
        }
        navigate(`/movies/${id}/${selected}`)
        scrollTo(0,0)
    }

    return (
        <div id='dateSelect' className='pt-30'>
            <div className='flex flex-col md:flex-row items-center justify-between md:gap-10 gap-2 relative md:p-8 p-6 bg-primary/10 border border-primary/20 rounded-lg'>
                <BlurCircle top="-100px" left="-100px" />
                <BlurCircle bottom="-100px" right="-100px" />
                <div>
                    <p className='text-lg font-semibold'>Choose Date</p>
                    <div className='flex items-center md:gap-6 gap-2 text-sm mt-5'>
                        <ChevronLeftIcon width={28} />
                        <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
                            {Object.keys(dateTime)
                            .sort((a, b) => new Date(a) - new Date(b)) // ⬅️ sort ascending
                            .map((date) => (
                                <button key={date} onClick={() => setSelected(date)} className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${selected === date ? "bg-primary text-white" : "border border-primary/70"}`}>
                                    <span>{new Date(date).getDate()}</span>
                                    <span>{new Date(date).toLocaleDateString("en-US", { month: "short" })}</span>
                                </button>
                            ))}
                        </span>
                        <ChevronRightIcon width={28} />
                    </div>
                </div>
                <button onClick={onBookHandler} className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'>Book Now</button>
            </div>
        </div>
    )
}

export default DateSelect