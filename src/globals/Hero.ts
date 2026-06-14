import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: 'Főoldal — Hero',
  admin: {
    group: 'Tartalom',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Felirat a cím felett',
      defaultValue: 'Eger szívében',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Főcím',
      required: true,
      defaultValue: 'Friss virágok,',
      admin: {
        description: 'A főcím első sora.',
      },
    },
    {
      name: 'headingHighlight',
      type: 'text',
      label: 'Főcím kiemelt rész',
      required: true,
      defaultValue: 'szeretettel kötve',
      admin: {
        description: 'A főcím második, dőlt, kiemelt sora.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Leírás',
      defaultValue:
        'Személyre szabott virágköltemények, szezonális csokrok és egyedi ajándékok a Szent János utcából.',
    },
    {
      name: 'ctaPrimaryLabel',
      type: 'text',
      label: 'Elsődleges gomb felirata',
      defaultValue: 'Érdeklődjön / Rendeljen',
    },
    {
      name: 'ctaSecondaryLabel',
      type: 'text',
      label: 'Másodlagos gomb felirata',
      defaultValue: 'Kínálatunk',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero kép',
      admin: {
        description: 'Nagy, álló vagy négyzetes kép a hero szekció jobb oldalára.',
      },
    },
    {
      name: 'badgeLabel',
      type: 'text',
      label: 'Lebegő jelvény felirata',
      defaultValue: 'Nyitva',
    },
    {
      name: 'badgeValue',
      type: 'text',
      label: 'Lebegő jelvény értéke',
      defaultValue: 'Hétköznap 9–17',
    },
  ],
}
