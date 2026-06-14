'use client'

import { useEffect } from 'react'

export function ScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-element')

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-revealed')
          obs.unobserve(entry.target)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
    )

    elements.forEach((el) => observer.observe(el))

    // Fallback for fast scroll jumps: IntersectionObserver can skip elements
    // that move from below to above the viewport between two frames (e.g. in
    // the masonry gallery), leaving them stuck at opacity 0. Sweep on scroll
    // and reveal anything that is currently within the viewport.
    const sweep = () => {
      document.querySelectorAll('.reveal-element:not(.is-revealed)').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-revealed')
          observer.unobserve(el)
        }
      })
    }

    window.addEventListener('scroll', sweep, { passive: true })
    window.addEventListener('resize', sweep)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', sweep)
      window.removeEventListener('resize', sweep)
    }
  }, [])

  return null
}
