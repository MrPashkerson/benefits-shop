import type { Block } from 'payload/types'

import { invertBackground } from '../../fields/invertBackground'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: {
    singular: 'Медиаблок',
    plural: 'Медиаблоки',
  },
  fields: [
    invertBackground,
    {
      name: 'position',
      label: 'Положение',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'По умолчанию',
          value: 'default',
        },
        {
          label: 'На весь экран',
          value: 'fullscreen',
        },
      ],
    },
    {
      name: 'media',
      label: 'Медиафайл',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
