import type { Block } from 'payload/types'

import richText from '../../fields/richText'

export const Archive: Block = {
  slug: 'archive',
  labels: {
    singular: 'Архив',
    plural: 'Архивы',
  },
  fields: [
    richText({
      name: 'introContent',
      label: 'Текст',
    }),
    {
      name: 'populateBy',
      label: 'Заполнить',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Коллекцией',
          value: 'collection',
        },
        {
          label: 'Отдельным значением',
          value: 'selection',
        },
      ],
    },
    {
      type: 'select',
      name: 'relationTo',
      label: 'Коллекция для показа',
      defaultValue: 'products',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      options: [
        {
          label: 'Льготы',
          value: 'products',
        },
      ],
    },
    {
      type: 'relationship',
      name: 'categories',
      label: 'Категории для показа',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
    {
      type: 'number',
      name: 'limit',
      label: 'Лимит',
      defaultValue: 10,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
    },
    {
      type: 'relationship',
      name: 'selectedDocs',
      label: 'Льгота',
      relationTo: ['products'],
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
    },
    {
      type: 'relationship',
      name: 'populatedDocs',
      label: 'Заполненные документы',
      relationTo: ['products'],
      hasMany: true,
      admin: {
        disabled: true,
        description: 'Это поле автоматически заполняется после прочтения',
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
    {
      type: 'number',
      name: 'populatedDocsTotal',
      label: 'Всего заполнено документов',
      admin: {
        step: 1,
        disabled: true,
        description: 'Это поле автоматически заполняется после прочтения',
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
  ],
}
