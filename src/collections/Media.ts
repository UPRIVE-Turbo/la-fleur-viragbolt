import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Médiafájl',
    plural: 'Médiatár',
  },
  admin: {
    group: 'Tartalom',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt szöveg',
    },
  ],
  upload: true,
}
