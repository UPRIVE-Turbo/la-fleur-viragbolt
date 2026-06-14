import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Szolgáltatás',
    plural: 'Szolgáltatások',
  },
  admin: {
    group: 'Tartalom',
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'icon'],
  },
  access: {
    read: () => true,
  },
  orderable: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Név',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Leírás',
    },
    {
      name: 'price',
      type: 'text',
      label: 'Ár',
      admin: {
        description: 'Pl. "5 000 Ft-tól"',
      },
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Ikon',
      defaultValue: 'flower',
      options: [
        { label: 'Virág', value: 'flower' },
        { label: 'Gyűrűk (alkalmi)', value: 'rings' },
        { label: 'Ajándék', value: 'gift' },
        { label: 'Csillogás (szezonális)', value: 'sparkle' },
        { label: 'Növény', value: 'plant' },
      ],
      admin: {
        description: 'A szolgáltatás kártyáján megjelenő ikon.',
      },
    },
  ],
}
