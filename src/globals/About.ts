import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'Főoldal — Rólunk',
  admin: {
    group: 'Tartalom',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      label: 'Cím',
      required: true,
      defaultValue:
        'Több, mint virágbolt — egy hely, ahol a természet története találkozik az Önével.',
    },
    {
      name: 'paragraph1',
      type: 'textarea',
      label: 'Első bekezdés',
      defaultValue:
        'Az egri Szent János utcában található kis üzletünk nem csupán virágbolt. Hisszük, hogy minden megkötött csokornak lelke van — ezért szívvel-lélekkel válogatjuk a legszebb, legfrissebb virágokat nap mint nap.',
    },
    {
      name: 'paragraph2',
      type: 'textarea',
      label: 'Második bekezdés',
      defaultValue:
        'Célunk, hogy aki betér hozzánk, egy darabka örömöt és harmóniát is magával vigyen — legyen szó egyetlen szál virágról vagy egy egész esküvő virágdíszítéséről.',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Kép',
      admin: {
        description: 'Álló formátumú kép a bolt belsejéről vagy a csapatról.',
      },
    },
    {
      name: 'badgeNumber',
      type: 'text',
      label: 'Kiemelt szám',
      defaultValue: '10+',
    },
    {
      name: 'badgeLabel',
      type: 'text',
      label: 'Kiemelt szám felirata',
      defaultValue: 'Év tapasztalat',
    },
    {
      type: 'collapsible',
      label: 'Alapító',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'founderName',
          type: 'text',
          label: 'Név',
          defaultValue: 'Kovács Anna',
        },
        {
          name: 'founderRole',
          type: 'text',
          label: 'Beosztás',
          defaultValue: 'Alapító & Virágkötő',
        },
        {
          name: 'founderImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Fotó',
        },
      ],
    },
  ],
}
