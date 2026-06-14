import React from 'react'
import { Lora, Open_Sans } from 'next/font/google'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Metadata } from 'next'
import './styles.css'

const lora = Lora({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-lora',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
})

const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-open-sans',
  weight: ['300', '400', '500', '600'],
})

const DEFAULT_TITLE = 'La Fleur Virágbolt | Friss virágok, szeretettel kötve – Eger'
const DEFAULT_DESCRIPTION =
  'La Fleur Virágbolt Eger szívében, a Szent János utcában. Friss vágott virágok, egyedi csokrok, esküvői és alkalmi dekorációk, ajándékok. Rendeljen most!'

export async function generateMetadata(): Promise<Metadata> {
  let title = DEFAULT_TITLE
  let description = DEFAULT_DESCRIPTION

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const settings = await payload.findGlobal({ slug: 'settings' })
    title = settings?.metaTitle || DEFAULT_TITLE
    description = settings?.metaDescription || DEFAULT_DESCRIPTION
  } catch (error) {
    console.error('Nem sikerült betölteni a SEO beállításokat a Payload-ból:', error)
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: 'hu_HU',
      type: 'website',
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="hu" className={`${lora.variable} ${openSans.variable} scroll-smooth`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
