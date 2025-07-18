import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollUp, setScrollUp] = useState(true)
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const navigate = useNavigate()
  const navLinkClass = "hover:text-primary transition-colors duration-300"
  const { favoriteMovies } = useAppContext();

  function handleLinkClick() {
    scrollTo(0, 0)
    setIsOpen(false)
  }

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      // Only run logic if we haven't already queued a frame
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Compare current scroll position to last to determine direction
          setScrollUp(window.scrollY < lastScrollY)
          // Update last scroll position
          lastScrollY = window.scrollY
          // Allow new requestAnimationFrame to be scheduled
          ticking = false
        })
        // Prevent multiple rAF calls while one is in progress
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 lg:px-16 xl:px-36 py-5'>
      <Link to="/" className='max-lg:flex-1'>
        <img src={assets.logo} alt="SnapShow" className='w-40 h-auto' />
      </Link>

      <div className={`max-lg:absolute max-lg:top-0 max-lg:left-0 max-lg:font-medium max-lg:text-lg z-50 flex flex-col lg:flex-row items-center max-lg:justify-center gap-8 min-lg:px-8 py-3 max-lg:h-screen min-lg:rounded-full backdrop-blur bg-black/70 lg:bg-white/10 lg:border border-gray-300/20 overflow-hidden 
      max-lg:transition-[width] max-lg:duration-300
      ${isOpen ? 'max-lg:w-[100vw]' : 'max-lg:w-0'} 
      transition-transform duration-300 transform 
      ${scrollUp ? 'lg:translate-y-0' : 'lg:-translate-y-[200%]'}`}>
        <XIcon className='lg:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
        <Link to="/" onClick={handleLinkClick} className={navLinkClass}>Home</Link>
        <Link to="/movies" onClick={handleLinkClick} className={navLinkClass}>Movies</Link>
        <Link to="/" onClick={handleLinkClick} className={navLinkClass}>Theaters</Link>
        <Link to="/" onClick={handleLinkClick} className={navLinkClass}>Releases</Link>
        {favoriteMovies.length > 0 && <Link to="/favorite" onClick={handleLinkClick} className={navLinkClass}>Favorites</Link>}
        {/* {user && <Link to="/my-bookings" onClick={handleLinkClick} className={navLinkClass}>Bookings</Link>} */}
      </div>

      <div className='flex items-center gap-8'>
        <SearchIcon className='max-lg:hidden w-6 h-6 cursor-pointer' />
        {
          !user
          ?
          <button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Login</button>
          :
          // <div className='w-[29px] h-[29px] flex justify-center items-center rounded-full border border-white/40'>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="My Bookings" onClick={() => navigate('/my-bookings')} labelIcon={<TicketPlus width={15} />}/>
              </UserButton.MenuItems>
            </UserButton>
          // </div>
        }
      </div>

      <MenuIcon className='max-lg:ml-4 lg:hidden w-8 h-8 cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
    </div>
  )
}

export default Navbar