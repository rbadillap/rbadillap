import type { CollectionConfig } from 'payload'

export const Experience: CollectionConfig = {
  slug: 'experience',
  labels: {
    singular: 'Experience',
    plural: 'Experience',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'role', 'year'],
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'year',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
