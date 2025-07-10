import { getLenis } from '../hooks/useLenis'

const handleAnchorClick = (e) => {
  e.preventDefault()
  const targetId = e.currentTarget.getAttribute('href').substring(1)
  const target = document.getElementById(targetId)

  if (target) {
    const lenis = getLenis()
    lenis?.scrollTo(target)
  }
}

export default handleAnchorClick
