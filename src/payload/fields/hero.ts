import type { Field } from 'payload/types'

import linkGroup from './linkGroup'
import richText from './richText'
import label from './richText/label'
import largeBody from './richText/largeBody'

export const hero: Field = {
  name: 'hero',
  label: false,
  type: 'group',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Тип важности',
      required: true,
      defaultValue: 'lowImpact',
      options: [
        {
          label: 'Отсутствует',
          value: 'none',
        },
        {
          label: 'Важный',
          value: 'highImpact',
        },
        {
          label: 'Нейтральный',
          value: 'mediumImpact',
        },
        {
          label: 'Незначительный',
          value: 'lowImpact',
        },
        {
          label: 'Другое',
          value: 'customHero',
        },
      ],
    },
    richText({
      admin: {
        elements: ['h1', largeBody, label, 'link'],
        leaves: [],
      },
    }),
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      label: 'Медифайл',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact', 'customHero'].includes(type),
      },
    },
  ],
}
