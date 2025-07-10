import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenis } from '../hooks/useLenis'

const ScrollToTop = () => {
  const location = useLocation()

  useEffect(() => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true }) // you can also remove `immediate` for animated scroll
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  return null
}

export default ScrollToTop