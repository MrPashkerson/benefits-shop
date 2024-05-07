import type { Block, Field } from 'payload/types'

import { invertBackground } from '../../fields/invertBackground'
import link from '../../fields/link'
import richText from '../../fields/richText'

const columnFields: Field[] = [
  {
    name: 'size',
    label: 'Занимаемые размер на странице',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        value: 'oneThird',
        label: 'Одна треть',
      },
      {
        value: 'half',
        label: 'Половина',
      },
      {
        value: 'twoThirds',
        label: 'Две трети',
      },
      {
        value: 'full',
        label: 'На всю ширину',
      },
    ],
  },
  richText(),
  {
    name: 'enableLink',
    label: 'Добавить ссылку',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: 'Контент',
    plural: 'Контент',
  },
  fields: [
    invertBackground,
    {
      name: 'columns',
      label: 'Колонки',
      type: 'array',
      fields: columnFields,
    },
  ],
}
