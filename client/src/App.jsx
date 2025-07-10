import React from 'react'
import { Navbar, Footer, PageWrapper, ScrollToTop, BlurCircle } from './components'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Home, Movies, MovieDetails, SeatLayout, MyBookings, Favorite } from './pages'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import useLenis from './hooks/useLenis'
import { Layout, Dashboard, AddShows, ListShows, ListBookings } from './pages/admin'

const App = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith("/admin")
  useLenis()

  return (
    <div className='overflow-hidden'>
      <Toaster />
      {!isAdminRoute && <Navbar />}

      <ScrollToTop /> {/* <--- scroll to top on route change */}
      <BlurCircle mode='cursor' />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/movies" element={<PageWrapper><Movies /></PageWrapper>} />
          <Route path="/movies/:id" element={<PageWrapper><MovieDetails /></PageWrapper>} />
          <Route path="/movies/:id/:date" element={<PageWrapper><SeatLayout /></PageWrapper>} />
          <Route path="/my-bookings" element={<PageWrapper><MyBookings /></PageWrapper>} />
          <Route path="/favorite" element={<PageWrapper><Favorite /></PageWrapper>} />

          <Route path='/admin/*' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-shows" element={<AddShows />} />
            <Route path="list-shows" element={<ListShows />} />
            <Route path="list-bookings" element={<ListBookings />} />
          </Route>
        </Routes>
      </AnimatePresence>

      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default App
