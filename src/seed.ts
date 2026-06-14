import { config as loadEnv } from 'dotenv'
import { getPayload, type Payload } from 'payload'
import type { Service } from './payload-types'

loadEnv()

const resetImages = process.argv.includes('--reset-images')

const services: Array<Pick<Service, 'name' | 'description' | 'price' | 'icon'>> = [
  {
    name: 'Friss Csokrok',
    description:
      'Gondosan összeállított, szezonális csokrok a mindennapok egyedi pillanataihoz.',
    price: '4 500 Ft-tól',
    icon: 'flower',
  },
  {
    name: 'Alkalmi Virágok',
    description:
      'Esküvő, születésnap, évforduló — személyre szabott virágköltemények a nagy napokra.',
    price: 'Egyedi árajánlat',
    icon: 'rings',
  },
  {
    name: 'Ajándékok',
    description:
      'Kézműves tárgyak, minőségi kerámiák és elegáns kísérő meglepetések a virágok mellé.',
    price: '2 000 Ft-tól',
    icon: 'gift',
  },
  {
    name: 'Szezonális Termékek',
    description:
      'Kopogtatók, asztaldíszek, tavaszi és téli ünnepi dekorációk, melyek hangulatot teremtenek.',
    price: '3 500 Ft-tól',
    icon: 'sparkle',
  },
]

async function clearImages(payload: Payload) {
  console.log('Képek törlése...')

  let page = 1
  while (true) {
    const result = await payload.find({ collection: 'gallery', limit: 100, page })
    for (const doc of result.docs) {
      await payload.delete({ collection: 'gallery', id: doc.id })
    }
    if (!result.hasNextPage) break
    page++
  }

  await payload.updateGlobal({ slug: 'hero', data: { image: null } })
  await payload.updateGlobal({ slug: 'about', data: { image: null, founderImage: null } })

  page = 1
  while (true) {
    const result = await payload.find({ collection: 'media', limit: 100, page })
    for (const doc of result.docs) {
      await payload.delete({ collection: 'media', id: doc.id })
    }
    if (!result.hasNextPage) break
    page++
  }

  console.log('Képek törölve.')
}

async function seedImageFromUrl(payload: Payload, url: string, alt: string, filename: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const arrayBuffer = await response.arrayBuffer()
    const mimetype = response.headers.get('content-type') || 'image/jpeg'

    const media = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data: Buffer.from(arrayBuffer),
        mimetype,
        name: filename,
        size: arrayBuffer.byteLength,
      },
    })

    return media.id
  } catch (error) {
    console.warn(`Nem sikerült letölteni a képet (${filename}):`, error)
    return undefined
  }
}

async function seed() {
  const { default: config } = await import('./payload.config.js')
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  if (resetImages) {
    await clearImages(payload)
  }

  console.log('Beállítások (settings) frissítése...')
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      companyName: 'La Fleur Virágbolt',
      footerTagline: 'Friss virágok, szeretettel kötve.',
      address: 'Szent János utca 7, 3300 Eger',
      email: 'lafleurvirag.eger@gmail.com',
      openingHours: 'Hétfő – Péntek: 9:00 – 17:00, Szombat – Vasárnap: Zárva',
      facebook: 'https://www.facebook.com/lafleureger',
      instagram: 'https://www.instagram.com/lafleureger',
      metaTitle: 'La Fleur Virágbolt | Friss virágok, szeretettel kötve – Eger',
      metaDescription:
        'La Fleur Virágbolt Eger szívében, a Szent János utcában. Friss vágott virágok, egyedi csokrok, esküvői és alkalmi dekorációk, ajándékok. Rendeljen most!',
    },
  })

  console.log('Szolgáltatások (services) feltöltése...')
  const existingServices = await payload.find({ collection: 'services', limit: 1 })
  if (existingServices.totalDocs === 0) {
    for (const service of services) {
      await payload.create({ collection: 'services', data: service })
    }
    console.log(`${services.length} szolgáltatás létrehozva.`)
  } else {
    console.log('Szolgáltatások már léteznek, kihagyva.')
  }

  console.log('Hero szekció feltöltése...')
  const existingHero = await payload.findGlobal({ slug: 'hero' })
  if (resetImages || !existingHero.image) {
    const heroImageId = await seedImageFromUrl(
      payload,
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1200&auto=format&fit=crop',
      'Gyönyörű, friss vágott virágcsokor pasztell színekben',
      'hero-bouquet.jpg',
    )

    await payload.updateGlobal({
      slug: 'hero',
      data: {
        eyebrow: 'Eger szívében',
        heading: 'Friss virágok,',
        headingHighlight: 'szeretettel kötve',
        description:
          'Személyre szabott virágköltemények, szezonális csokrok és egyedi ajándékok a Szent János utcából.',
        ctaPrimaryLabel: 'Érdeklődjön / Rendeljen',
        ctaSecondaryLabel: 'Kínálatunk',
        badgeLabel: 'Nyitva',
        badgeValue: 'Hétköznap 9–17',
        ...(heroImageId ? { image: heroImageId } : {}),
      },
    })
  } else {
    console.log('Hero szekció már be van állítva, kihagyva.')
  }

  console.log('Rólunk szekció feltöltése...')
  const existingAbout = await payload.findGlobal({ slug: 'about' })
  if (resetImages || !existingAbout.image) {
    const aboutImageId = await seedImageFromUrl(
      payload,
      'https://images.unsplash.com/photo-1717607421625-8ee16249293d?fm=jpg&q=60&w=1200&auto=format&fit=crop',
      'Virágbolt enteriőr, munkaasztal friss virágokkal',
      'about-shop-interior.jpg',
    )
    const founderImageId = await seedImageFromUrl(
      payload,
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      'Kovács Anna, a La Fleur Virágbolt alapítója',
      'about-founder.jpg',
    )

    await payload.updateGlobal({
      slug: 'about',
      data: {
        heading:
          'Több, mint virágbolt — egy hely, ahol a természet története találkozik az Önével.',
        paragraph1:
          'Az egri Szent János utcában található kis üzletünk nem csupán virágbolt. Hisszük, hogy minden megkötött csokornak lelke van — ezért szívvel-lélekkel válogatjuk a legszebb, legfrissebb virágokat nap mint nap.',
        paragraph2:
          'Célunk, hogy aki betér hozzánk, egy darabka örömöt és harmóniát is magával vigyen — legyen szó egyetlen szál virágról vagy egy egész esküvő virágdíszítéséről.',
        badgeNumber: '10+',
        badgeLabel: 'Év tapasztalat',
        founderName: 'Kovács Anna',
        founderRole: 'Alapító & Virágkötő',
        ...(aboutImageId ? { image: aboutImageId } : {}),
        ...(founderImageId ? { founderImage: founderImageId } : {}),
      },
    })
  } else {
    console.log('Rólunk szekció már be van állítva, kihagyva.')
  }

  console.log('Galéria feltöltése...')
  const existingGallery = await payload.find({ collection: 'gallery', limit: 1 })
  if (resetImages || existingGallery.totalDocs === 0) {
    const galleryImages = [
      {
        url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?fm=jpg&q=60&w=1000&auto=format&fit=crop',
        alt: 'Romantikus asztaldísz esküvőre',
        filename: 'gallery-1.jpg',
      },
      {
        url: 'https://images.unsplash.com/photo-1754624048855-c6f10262e1ae?fm=jpg&q=60&w=1000&auto=format&fit=crop',
        alt: 'Nagy méretű ajándékcsokor rózsákból',
        filename: 'gallery-2.jpg',
      },
      {
        url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop',
        alt: 'Tavaszi virágcsokor pasztell színekben',
        filename: 'gallery-3.jpg',
      },
      {
        url: 'https://images.unsplash.com/photo-1597696929736-6d13bed8e6a8?fm=jpg&q=60&w=1000&auto=format&fit=crop',
        alt: 'Kézműves kerámia váza szárazvirágokkal',
        filename: 'gallery-4.jpg',
      },
      {
        url: 'https://images.unsplash.com/photo-1685613858397-64f79a0f3603?fm=jpg&q=60&w=1000&auto=format&fit=crop',
        alt: 'Elegáns friss virágcsokor',
        filename: 'gallery-5.jpg',
      },
      {
        url: 'https://images.unsplash.com/photo-1566152474719-8d79ca1a4c66?fm=jpg&q=60&w=1000&auto=format&fit=crop',
        alt: 'Szezonális koszorú és asztaldísz',
        filename: 'gallery-6.jpg',
      },
    ]

    for (const item of galleryImages) {
      const imageId = await seedImageFromUrl(payload, item.url, item.alt, item.filename)
      if (imageId) {
        await payload.create({
          collection: 'gallery',
          data: { image: imageId, alt: item.alt },
        })
      }
    }
    console.log(`${galleryImages.length} galéria kép feltöltve.`)
  } else {
    console.log('Galéria már fel van töltve, kihagyva.')
  }

  console.log('Seed kész.')
  await payload.destroy()
}

seed().catch(async (error) => {
  console.error(error)
  process.exitCode = 1
})
