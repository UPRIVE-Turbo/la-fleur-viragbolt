'use client'

import { useEffect, useState } from 'react'
import { List, X, FacebookLogo, InstagramLogo } from '@phosphor-icons/react/dist/ssr'

const NAV_LINKS = [
  { href: '#kinalat', label: 'Kínálatunk' },
  { href: '#rolunk', label: 'Rólunk' },
  { href: '#galeria', label: 'Galéria' },
  { href: '#kapcsolat', label: 'Kapcsolat' },
]

export function Header({
  facebook,
  instagram,
}: {
  facebook?: string | null
  instagram?: string | null
}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full px-4 transition-all duration-300 sm:px-8 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-deep-green/5 px-6 py-3 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? 'bg-cream/95 shadow-md'
            : 'bg-cream/85 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)]'
        }`}
      >
        <a href="#" className="font-serif text-xl tracking-tight text-deep-green sm:text-2xl">
          La Fleur
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.slice(0, 3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-deep-green transition-colors hover:text-fresh-green"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kapcsolat"
            className="rounded-full bg-deep-green px-5 py-2 text-sm font-medium text-cream transition-colors hover:bg-fresh-green"
          >
            Rendelés
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? 'Menü bezárása' : 'Menü megnyitása'}
          className="relative z-50 p-2 text-deep-green md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-cream px-8 transition-transform duration-500 md:hidden ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <nav className="flex flex-col gap-8 text-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-serif text-4xl text-deep-green transition-colors hover:text-fresh-green"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="absolute bottom-10 left-0 flex w-full justify-center gap-6 text-deep-green/60">
          {facebook && (
            <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookLogo size={28} weight="fill" />
            </a>
          )}
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramLogo size={28} weight="fill" />
            </a>
          )}
        </div>
      </div>
    </header>
  )
}
