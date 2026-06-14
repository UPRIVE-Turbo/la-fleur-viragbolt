import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Beállítások',
  admin: {
    group: 'Beállítások',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
      label: 'Cégnév',
      defaultValue: 'La Fleur Virágbolt',
    },
    {
      name: 'footerTagline',
      type: 'text',
      label: 'Lábléc szlogen',
      defaultValue: 'Friss virágok, szeretettel kötve.',
      admin: {
        description: 'A lábléc cégnév alatt megjelenő rövid szlogen.',
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefonszám',
      admin: {
        description: 'Pl. "+36 30 123 4567" — a webhelyen kattintható tel: linkként jelenik meg.',
      },
    },
    {
      name: 'address',
      type: 'text',
      label: 'Cím',
      defaultValue: 'Szent János utca 7, 3300 Eger',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      defaultValue: 'lafleurvirag.eger@gmail.com',
    },
    {
      name: 'openingHours',
      type: 'text',
      label: 'Nyitvatartás',
      defaultValue: 'Hétfő – Péntek: 9:00 – 17:00, Szombat – Vasárnap: Zárva',
    },
    {
      name: 'facebook',
      type: 'text',
      label: 'Facebook link',
      defaultValue: 'https://www.facebook.com/lafleureger',
    },
    {
      name: 'instagram',
      type: 'text',
      label: 'Instagram link',
    },
    {
      name: 'tiktok',
      type: 'text',
      label: 'TikTok link',
    },
    {
      type: 'collapsible',
      label: 'SEO',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'SEO cím',
          defaultValue: 'La Fleur Virágbolt | Friss virágok, szeretettel kötve – Eger',
          admin: {
            description: 'A böngészőfülön és a keresőtalálatok címében megjelenő szöveg.',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'SEO leírás',
          defaultValue:
            'La Fleur Virágbolt Eger szívében, a Szent János utcában. Friss vágott virágok, egyedi csokrok, esküvői és alkalmi dekorációk, ajándékok. Rendeljen most!',
          admin: {
            description: 'A keresőtalálatokban megjelenő rövid leírás (kb. 150-160 karakter).',
          },
        },
      ],
    },
  ],
}
