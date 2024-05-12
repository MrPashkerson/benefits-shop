import type { Page } from '../payload-types'

export const home: Partial<Page> = {
  title: 'Главная',
  slug: 'home',
  _status: 'published',
  meta: {
    title: 'Магазин Льгот',
    description: 'Магазин гибких льгот для сотрудников.',
    image: null,
  },
  hero: {
    type: 'customHero',
    richText: [
      {
        children: [
          {
            text: 'Льготы',
          },
        ],
        type: 'h2',
      },
      {
        type: 'h2',
        children: [
          {
            text: 'под ваш',
          },
        ],
      },
      {
        type: 'h2',
        children: [
          {
            text: 'стиль жизни',
          },
        ],
      },
      {
        type: 'large-body',
        children: [
          {
            text: '\nАдаптируемся к каждому!',
          },
        ],
      },
    ],
    links: [
      {
        link: {
          type: 'reference',
          appearance: 'primary',
          reference: {
            relationTo: 'pages',
            value: '{{PRODUCTS_PAGE_ID}}',
          },
          label: 'В каталог',
          url: '',
          icon: '{{HERO_IMAGE}}',
        },
      },
    ],
    media: '{{HERO_IMAGE}}',
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
      categories: [],
      limit: 9,
    },
  ],
}
