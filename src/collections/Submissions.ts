import type { CollectionConfig } from 'payload'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  labels: {
    singular: 'Megkeresés',
    plural: 'Megkeresések',
  },
  admin: {
    group: 'Megkeresések',
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'occasion', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Név',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Telefonszám',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'occasion',
      type: 'select',
      label: 'Alkalom',
      options: [
        { label: 'Születésnap / Névnap', value: 'birthday' },
        { label: 'Esküvő', value: 'wedding' },
        { label: 'Évforduló', value: 'anniversary' },
        { label: 'Megemlékezés / Részvét', value: 'sympathy' },
        { label: 'Csak úgy, meglepetésként', value: 'just-because' },
        { label: 'Egyéb', value: 'other' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Üzenet / kívánság',
    },
  ],
}
