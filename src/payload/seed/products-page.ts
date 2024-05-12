import type { Page } from '../payload-types'

export const productsPage: Omit<Page, 'updatedAt' | 'createdAt' | 'id'> = {
  title: 'Каталог',
  slug: 'products',
  _status: 'published',
  meta: {
    title: '',
    description: '',
  },
  hero: {
    type: 'lowImpact',
    media: null,
    richText: [
      {
        type: 'p',
        children: [
          {
            text: '',
          },
        ],
      },
    ],
    links: [],
  },
  layout: [
    {
      blockName: 'Архивный блок',
      blockType: 'archive',
      introContent: [
        {
          type: 'p',
          children: [
            {
              text: '',
            },
          ],
        },
      ],
      populateBy: 'collection',
      relationTo: 'products',
      limit: 9,
      categories: [],
    },
  ],
}
