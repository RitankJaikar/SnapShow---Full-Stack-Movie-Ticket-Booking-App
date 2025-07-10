import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

let lenis = null

export const getLenis = () => lenis

const useLenis = () => {
  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return // ❌ Disable for admin

    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smooth: true,
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
}

export default useLenis