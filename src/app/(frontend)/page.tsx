import { getPayload } from 'payload'
import config from '@/payload.config'
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Quotes,
  TiktokLogo,
} from '@phosphor-icons/react/dist/ssr'
import { Header } from './components/Header'
import { OrderForm } from './components/OrderForm'
import { ScrollReveal } from './components/ScrollReveal'
import { ServiceIcon } from './components/icons'
import type { Media } from '@/payload-types'

const FALLBACK_SERVICES = [
  {
    id: 'fallback-1',
    name: 'Friss Csokrok',
    description:
      'Gondosan összeállított, szezonális csokrok a mindennapok egyedi pillanataihoz.',
    price: '4 500 Ft-tól',
    icon: 'flower',
  },
  {
    id: 'fallback-2',
    name: 'Alkalmi Virágok',
    description:
      'Esküvő, születésnap, évforduló — személyre szabott virágköltemények a nagy napokra.',
    price: 'Egyedi árajánlat',
    icon: 'rings',
  },
  {
    id: 'fallback-3',
    name: 'Ajándékok',
    description:
      'Kézműves tárgyak, minőségi kerámiák és elegáns kísérő meglepetések a virágok mellé.',
    price: '2 000 Ft-tól',
    icon: 'gift',
  },
  {
    id: 'fallback-4',
    name: 'Szezonális Dekorációk',
    description:
      'Kopogtatók, asztaldíszek, tavaszi és téli ünnepi dekorációk, melyek hangulatot teremtenek.',
    price: '3 500 Ft-tól',
    icon: 'sparkle',
  },
]

const FALLBACK_GALLERY = [
  {
    id: 'g1',
    alt: 'Romantikus asztaldísz esküvőre, rózsaszín rózsákkal',
    src: 'https://picsum.photos/seed/lafleur-bouquet-1/800/1000',
  },
  {
    id: 'g2',
    alt: 'Nagy méretű ajándékcsokor vörös rózsákból',
    src: 'https://picsum.photos/seed/lafleur-bouquet-2/800/600',
  },
  {
    id: 'g3',
    alt: 'Tavaszi hagymás virágok kaspóban',
    src: 'https://picsum.photos/seed/lafleur-bouquet-3/800/900',
  },
  {
    id: 'g4',
    alt: 'Kézműves kerámia váza szárazvirágokkal',
    src: 'https://picsum.photos/seed/lafleur-bouquet-4/800/1100',
  },
  {
    id: 'g5',
    alt: 'Pasztell szellőrózsa csokor közelről',
    src: 'https://picsum.photos/seed/lafleur-bouquet-5/800/1000',
  },
  {
    id: 'g6',
    alt: 'Esküvői dekoráció zöld levelekkel és fehér virágokkal',
    src: 'https://picsum.photos/seed/lafleur-bouquet-6/800/700',
  },
]

function isMedia(value: unknown): value is Media {
  return Boolean(value && typeof value === 'object' && 'url' in (value as object))
}

export default async function HomePage() {
  let settings: Awaited<ReturnType<typeof getData>>['settings'] | null = null
  let hero: Awaited<ReturnType<typeof getData>>['hero'] | null = null
  let about: Awaited<ReturnType<typeof getData>>['about'] | null = null
  let services: Awaited<ReturnType<typeof getData>>['services'] = []
  let gallery: Awaited<ReturnType<typeof getData>>['gallery'] = []

  try {
    const data = await getData()
    settings = data.settings
    hero = data.hero
    about = data.about
    services = data.services
    gallery = data.gallery
  } catch (error) {
    console.error('Nem sikerült betölteni a tartalmat a Payload-ból:', error)
  }

  const companyName = settings?.companyName || 'La Fleur Virágbolt'
  const footerTagline = settings?.footerTagline || 'Friss virágok, szeretettel kötve.'
  const address = settings?.address || 'Szent János utca 7, 3300 Eger'
  const email = settings?.email || 'lafleurvirag.eger@gmail.com'
  const phone = settings?.phone
  const openingHours =
    settings?.openingHours || 'Hétfő – Péntek: 9:00 – 17:00, Szombat – Vasárnap: Zárva'
  const facebook = settings?.facebook || 'https://www.facebook.com/lafleureger'
  const instagram = settings?.instagram
  const tiktok = settings?.tiktok

  const heroEyebrow = hero?.eyebrow || 'Eger szívében'
  const heroHeading = hero?.heading || 'Friss virágok,'
  const heroHighlight = hero?.headingHighlight || 'szeretettel kötve'
  const heroDescription =
    hero?.description ||
    'Személyre szabott virágköltemények, szezonális csokrok és egyedi ajándékok a Szent János utcából.'
  const heroCtaPrimary = hero?.ctaPrimaryLabel || 'Érdeklődjön / Rendeljen'
  const heroCtaSecondary = hero?.ctaSecondaryLabel || 'Kínálatunk'
  const heroBadgeLabel = hero?.badgeLabel || 'Nyitva'
  const heroBadgeValue = hero?.badgeValue || 'Hétköznap 9–17'
  const heroImage = isMedia(hero?.image)
    ? hero.image.url || ''
    : 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1200&auto=format&fit=crop'

  const aboutHeading =
    about?.heading ||
    'Több, mint virágbolt — egy hely, ahol a természet története találkozik az Önével.'
  const aboutParagraph1 =
    about?.paragraph1 ||
    'Az egri Szent János utcában található kis üzletünk nem csupán virágbolt. Hisszük, hogy minden megkötött csokornak lelke van — ezért szívvel-lélekkel válogatjuk a legszebb, legfrissebb virágokat nap mint nap.'
  const aboutParagraph2 =
    about?.paragraph2 ||
    'Célunk, hogy aki betér hozzánk, egy darabka örömöt és harmóniát is magával vigyen — legyen szó egyetlen szál virágról vagy egy egész esküvő virágdíszítéséről.'
  const aboutImage = isMedia(about?.image)
    ? about.image.url || ''
    : 'https://picsum.photos/seed/lafleur-shop-interior/800/1000'
  const aboutBadgeNumber = about?.badgeNumber || '10+'
  const aboutBadgeLabel = about?.badgeLabel || 'Év tapasztalat'
  const founderName = about?.founderName
  const founderRole = about?.founderRole
  const founderImage = isMedia(about?.founderImage) ? about.founderImage.url || '' : null

  const serviceItems = services.length > 0 ? services : FALLBACK_SERVICES
  const galleryItems =
    gallery.length > 0
      ? gallery
          .filter((item) => isMedia(item.image))
          .map((item) => ({
            id: item.id,
            alt: item.alt,
            src: (item.image as Media).url || '',
          }))
      : FALLBACK_GALLERY

  return (
    <>
      <Header facebook={facebook} instagram={instagram} />
      <ScrollReveal />

      <main>
        {/* Hero */}
        <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[1400px] items-center px-4 pt-24 pb-12 sm:px-8">
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="z-10 flex flex-col items-start pt-10 lg:col-span-6 lg:pt-0">
              <span className="reveal-element mb-6 flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-fresh-green uppercase">
                <span className="h-px w-8 bg-fresh-green" /> {heroEyebrow}
              </span>
              <h1
                className="reveal-element mb-8 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
                style={{ transitionDelay: '100ms' }}
              >
                {heroHeading}
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 italic text-fresh-green">{heroHighlight}</span>
                  <span className="absolute -bottom-2 -left-2 -z-10 h-[40%] w-full rounded-full bg-powder-pink/60 blur-[2px]" />
                </span>
              </h1>
              <p
                className="reveal-element mb-10 max-w-md text-lg font-light text-deep-green/80 sm:text-xl"
                style={{ transitionDelay: '200ms' }}
              >
                {heroDescription}
              </p>
              <div
                className="reveal-element flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
                style={{ transitionDelay: '300ms' }}
              >
                <a
                  href="#kapcsolat"
                  className="hover-lift flex w-full items-center justify-center gap-2 rounded-full bg-deep-green px-8 py-4 text-center font-medium text-cream transition-colors hover:bg-fresh-green sm:w-auto"
                >
                  {heroCtaPrimary} <ArrowRight size={18} weight="bold" />
                </a>
                <a
                  href="#kinalat"
                  className="hover-lift w-full rounded-full border border-deep-green/20 px-8 py-4 text-center font-medium transition-colors hover:bg-deep-green/5 sm:w-auto"
                >
                  {heroCtaSecondary}
                </a>
              </div>
            </div>

            <div
              className="reveal-element relative h-[60vh] w-full lg:col-span-6 lg:h-[85vh]"
              style={{ transitionDelay: '400ms' }}
            >
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[50vmax] bg-fresh-green/10" />
              <img
                src={heroImage}
                alt="Gyönyörű, friss vágott virágcsokor pasztell színekben"
                className="absolute inset-0 h-full w-full rounded-t-[50vmax] object-cover shadow-[0_20px_40px_-20px_rgba(45,74,48,0.3)]"
              />
              <div className="animate-float absolute -bottom-6 -left-6 flex items-center gap-4 rounded-full bg-cream p-4 pr-6 shadow-lg sm:bottom-10 sm:-left-12">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-powder-pink">
                  <Clock size={24} weight="fill" className="text-deep-green" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider text-deep-green/60 uppercase">
                    {heroBadgeLabel}
                  </p>
                  <p className="text-sm font-semibold">{heroBadgeValue}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kínálatunk */}
        <section id="kinalat" className="mx-auto w-full max-w-[1400px] px-4 py-24 sm:px-8">
          <div className="reveal-element mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="mb-4 font-serif text-4xl tracking-tight sm:text-5xl">
                Gondoskodás
                <br />
                minden szálban
              </h2>
              <p className="text-lg text-deep-green/70">
                Vágott virágok, csokrok, ajándékok és szezonális termékek — legyen szó a
                mindennapok apró örömeiről vagy az élet legfontosabb eseményeiről.
              </p>
            </div>
            <a
              href="#galeria"
              className="group flex items-center gap-2 border-b border-fresh-green/30 pb-1 font-medium text-fresh-green transition-colors hover:border-fresh-green"
            >
              Galéria megtekintése
              <ArrowUpRight
                size={18}
                weight="bold"
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {serviceItems.map((service, index) => (
              <div
                key={service.id}
                className="hover-lift reveal-element group rounded-3xl border border-deep-green/10 bg-white p-8"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-powder-pink/40 text-fresh-green transition-transform duration-300 group-hover:scale-110">
                  <ServiceIcon name={service.icon ?? undefined} size={24} weight="fill" />
                </div>
                <h3 className="mb-2 font-serif text-2xl">{service.name}</h3>
                <p className="mb-4 text-sm leading-relaxed text-deep-green/60">
                  {service.description}
                </p>
                {service.price && (
                  <p className="text-sm font-semibold text-fresh-green">{service.price}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Rólunk */}
        <section id="rolunk" className="relative w-full overflow-hidden bg-white py-24">
          <div className="absolute top-0 right-0 hidden h-full w-[50vw] rounded-l-[100px] bg-powder-pink/10 md:block" />

          <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="reveal-element relative lg:col-span-5">
                <div className="aspect-4/5 overflow-hidden rounded-3xl">
                  <img
                    src={aboutImage}
                    alt="Virágbolt enteriőr, munkaasztal friss virágokkal"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -right-8 -bottom-8 hidden h-40 w-40 flex-col items-center justify-center rounded-full bg-deep-green p-8 text-center text-cream shadow-xl sm:flex">
                  <span className="block font-serif text-3xl leading-none">{aboutBadgeNumber}</span>
                  <span className="mt-1 text-xs tracking-widest uppercase opacity-80">
                    {aboutBadgeLabel}
                  </span>
                </div>
              </div>

              <div className="reveal-element lg:col-span-6 lg:col-start-7" style={{ transitionDelay: '150ms' }}>
                <Quotes size={48} weight="fill" className="mb-6 text-powder-pink/60" />
                <h2 className="mb-8 font-serif text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
                  {aboutHeading}
                </h2>
                <div className="space-y-6 text-lg font-light text-deep-green/70 md:text-xl">
                  <p>{aboutParagraph1}</p>
                  <p>{aboutParagraph2}</p>
                </div>
                {founderName && (
                  <div className="mt-12 flex items-center gap-6 border-t border-deep-green/10 pt-12">
                    {founderImage && (
                      <img
                        src={founderImage}
                        alt={founderName}
                        className="h-16 w-16 rounded-full object-cover grayscale"
                      />
                    )}
                    <div>
                      <p className="font-serif text-lg font-bold">{founderName}</p>
                      {founderRole && (
                        <p className="text-sm tracking-widest text-deep-green/60 uppercase">
                          {founderRole}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Galéria */}
        <section id="galeria" className="mx-auto w-full max-w-[1400px] px-4 py-24 sm:px-8">
          <div className="reveal-element mb-16 text-center">
            <h2 className="mb-4 font-serif text-4xl tracking-tight sm:text-5xl">Galéria</h2>
            <p className="text-lg text-deep-green/60">
              Néhány kedvenc csokrunk és dekorációnk az elmúlt időszakból.
            </p>
          </div>

          <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className="reveal-element break-inside-avoid"
                style={{ transitionDelay: `${(index % 3) * 100}ms` }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="hover-lift block w-full rounded-2xl object-cover"
                />
              </div>
            ))}
          </div>

          <div className="reveal-element mt-12 text-center">
            <a
              href={instagram || 'https://www.instagram.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-deep-green/70 transition-colors hover:text-deep-green"
            >
              <InstagramLogo size={20} weight="fill" /> Kövessen minket Instagramon
            </a>
          </div>
        </section>

        {/* Rendelés / Kapcsolat */}
        <section
          id="kapcsolat"
          className="mt-12 w-full overflow-hidden rounded-t-[3rem] bg-[#EAE5D9] lg:rounded-t-[5rem]"
        >
          <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8 lg:py-32">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
              <div className="reveal-element">
                <h2 className="mb-4 font-serif text-4xl tracking-tight sm:text-5xl">
                  Rendelés &<br />
                  Kapcsolat
                </h2>
                <p className="mb-10 text-lg text-deep-green/70">
                  Minden nagy pillanat egy üzenettel kezdődik. Írjon nekünk, és hamarosan
                  felvesszük Önnel a kapcsolatot a részletekkel kapcsolatban.
                </p>
                <OrderForm />
              </div>

              <div className="reveal-element flex flex-col gap-10" style={{ transitionDelay: '150ms' }}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/40 bg-white/50 p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream text-fresh-green">
                      <MapPin size={20} weight="fill" />
                    </div>
                    <h4 className="mb-2 font-serif text-xl">Címünk</h4>
                    <p className="text-sm text-deep-green/70">{address}</p>
                  </div>
                  <div className="rounded-3xl border border-white/40 bg-white/50 p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream text-fresh-green">
                      <Clock size={20} weight="fill" />
                    </div>
                    <h4 className="mb-2 font-serif text-xl">Nyitvatartás</h4>
                    <p className="text-sm text-deep-green/70">{openingHours}</p>
                  </div>
                  <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-white/40 bg-white/50 p-6 sm:col-span-2 sm:flex-row sm:items-center">
                    <div>
                      <h4 className="mb-1 font-serif text-xl">Elérhetőségek</h4>
                      <a
                        href={`mailto:${email}`}
                        className="block text-sm text-deep-green/70 transition-colors hover:text-fresh-green"
                      >
                        {email}
                      </a>
                      {phone && (
                        <a
                          href={`tel:${phone.replace(/\s/g, '')}`}
                          className="block text-sm text-deep-green/70 transition-colors hover:text-fresh-green"
                        >
                          {phone}
                        </a>
                      )}
                    </div>
                    <div className="flex gap-3">
                      {facebook && (
                        <a
                          href={facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                          className="hover-lift flex h-10 w-10 items-center justify-center rounded-full bg-deep-green text-cream transition-colors hover:bg-[#1877F2]"
                        >
                          <FacebookLogo size={20} weight="fill" />
                        </a>
                      )}
                      {instagram && (
                        <a
                          href={instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          className="hover-lift flex h-10 w-10 items-center justify-center rounded-full bg-deep-green text-cream transition-colors hover:bg-[#E1306C]"
                        >
                          <InstagramLogo size={20} weight="fill" />
                        </a>
                      )}
                      {tiktok && (
                        <a
                          href={tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="TikTok"
                          className="hover-lift flex h-10 w-10 items-center justify-center rounded-full bg-deep-green text-cream transition-colors hover:bg-black"
                        >
                          <TiktokLogo size={20} weight="fill" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-[300px] w-full overflow-hidden rounded-3xl shadow-sm lg:h-full lg:min-h-[300px]">
                  <iframe
                    title="La Fleur Virágbolt térkép - Eger, Szent János utca 7"
                    src="https://www.google.com/maps?q=Eger,+Szent+J%C3%A1nos+utca+7&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Lábléc */}
      <footer className="bg-deep-green px-4 py-12 text-cream sm:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <a href="#" className="mb-2 block font-serif text-3xl tracking-tight text-white">
              La Fleur
            </a>
            <p className="text-sm text-cream/50">{footerTagline}</p>
          </div>

          <div className="flex items-center gap-8 text-sm">
            <a href="#kinalat" className="transition-colors hover:text-powder-pink">
              Kínálatunk
            </a>
            <a href="#rolunk" className="transition-colors hover:text-powder-pink">
              Rólunk
            </a>
            <a href="#kapcsolat" className="transition-colors hover:text-powder-pink">
              Kapcsolat
            </a>
          </div>

          <div className="flex flex-col items-center gap-2 text-sm text-cream/40 md:items-end">
            <div className="flex gap-4">
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FacebookLogo size={20} weight="fill" />
                </a>
              )}
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramLogo size={20} weight="fill" />
                </a>
              )}
            </div>
            <span>&copy; 2026 {companyName}. Minden jog fenntartva.</span>
          </div>
        </div>
      </footer>
    </>
  )
}

async function getData() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [settings, hero, about, servicesResult, galleryResult] = await Promise.all([
    payload.findGlobal({ slug: 'settings' }),
    payload.findGlobal({ slug: 'hero', depth: 1 }),
    payload.findGlobal({ slug: 'about', depth: 1 }),
    payload.find({ collection: 'services', sort: '_order', limit: 100 }),
    payload.find({ collection: 'gallery', sort: '_order', limit: 100, depth: 1 }),
  ])

  return {
    settings,
    hero,
    about,
    services: servicesResult.docs,
    gallery: galleryResult.docs,
  }
}
