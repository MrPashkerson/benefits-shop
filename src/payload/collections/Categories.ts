import type { CollectionConfig } from 'payload/types'

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    plural: 'Категории',
    singular: 'документа',
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Название',
      type: 'text',
      required: true,
    },
    {
      name: 'media',
      label: 'Медиафайл',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

export default Categories
