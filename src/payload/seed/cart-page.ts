import type { Page } from '../payload-types'

export const cartPage: Partial<Page> = {
  title: 'Корзина',
  slug: 'cart',
  _status: 'published',
  meta: {
    title: 'Корзина',
    description:
      'Ваша корзина будет синхронизирована с вашим профилем пользователя, чтобы вы могли продолжать покупки с любого устройства.',
  },
  hero: {
    type: 'lowImpact',
    links: [],
    media: null,
    richText: [
      {
        type: 'h1',
        children: [
          {
            text: 'Корзина',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Корзина сохраняется в локальном хранилище, чтобы вы могли продолжить покупки позже. После аутентификации ваша корзина синхронизируется с вашим профилем пользователя, и вы сможете продолжить покупки с любого устройства.',
          },
        ],
      },
    ],
  },
  layout: [
    {
      richText: [
        {
          children: [
            {
              text: 'Посмотрите все варианты',
            },
          ],
          type: 'h4',
        },
        {
          children: [
            {
              text: 'Изучите все доступные варианты, чтобы выбрать то, что подходит именнно вам.',
            },
          ],
        },
      ],
      links: [
        {
          link: {
            type: 'reference',
            url: '',
            reference: {
              relationTo: 'pages',
              value: '{{PRODUCTS_PAGE_ID}}',
            },
            label: 'Перейти в каталог',
            appearance: 'primary',
          },
        },
      ],
      blockName: '',
      blockType: 'cta',
    },
  ],
}
