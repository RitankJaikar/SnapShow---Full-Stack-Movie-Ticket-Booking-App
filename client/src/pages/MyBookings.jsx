import { BlurCircle, Loading } from '../components'
import { dummyBookingData } from '../assets/assets'
import React, { useEffect, useState } from 'react'
import timeFormat from '../lib/timeFormat'
import dateFormat from '../lib/dateFormat'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const MyBookings = () => {
  const { axios, image_base_url, user, getToken } = useAppContext();

  const currency = import.meta.env.VITE_CURRENCY
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const getMyBookings = async () => {
    // setBookings(dummyBookingData)
    // setIsLoading(false)

    try {
      const { data } = await axios.get("/api/user/bookings", { headers: { Authorization: `Bearer ${await getToken()}` } });

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching bookings: ", error);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if(user) {
      getMyBookings();
    }
  }, [user])

  return !isLoading ? (
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="-100px" right="100px" />
      <h1 className='text-2xl sm:text-3xl font-semibold text-white text-center mb-8'>My Bookings</h1>
      {
      bookings.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No bookings yet. Book your first show now! 🍿</p>
      ) :
      bookings.map((item, index) => (
        <div key={index} className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2'>
          <div className='flex flex-col md:flex-row'>
            <img src={image_base_url + item.show.movie.poster_path} alt={item.show.movie.title} className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded' />
            <div className='flex flex-col p-4'>
              <p className='text-lg font-semibold'>{item.show.movie.title}</p>
              <p className='text-gray-400 text-sm'>{timeFormat(item.show.movie.runtime)}</p>
              <p className='text-gray-400 text-sm mt-auto'>{dateFormat(item.show.showDateTime)}</p>
            </div>
          </div>

          <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
            <div className='flex items-center gap-4'>
              <p className='text-2xl font-semibold mb-3'>{currency}{item.amount}</p>
              {!item.isPaid && <Link to={item.paymentLink} className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'> Pay Now</Link>}
            </div>
            <div className='text-sm'>
              <p><span className='text-gray-400'>Total Tickets:</span> {item.bookedSeats.length}</p>
              <p><span className='text-gray-400'>Seat Number:</span> {item.bookedSeats.join(", ")}</p>
            </div>
          </div>
        </div>
      ))
      }
    </div>
  )
    : (
      <Loading />
    )
}

export default MyBookings