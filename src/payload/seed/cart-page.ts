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
    media: '',
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
            text: 'Корзина сохраняется в локальном хранилище, чтобы вы могли продолжить покупки позже. После аутентификации корзина будет синхронизирована с вашим профилем пользователя, и вы сможете продолжить покупки с любого устройства. Этот герой и содержимое под корзиной полностью динамичны и ',
          },
          {
            type: 'link',
            linkType: 'custom',
            url: '/admin',
            children: [
              {
                text: 'configured in the admin dashboard',
              },
            ],
          },
        ],
      },
    ],
  },
  layout: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'twoThirds',
          link: {
            type: 'reference',
            url: '',
            reference: null,
            label: '',
          },
          richText: [
            {
              children: [
                {
                  text: 'This is a custom layout building block configurable in the CMS—this can be anything you want. Related or suggested products, a blog post, video, etc.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      richText: [
        {
          children: [
            {
              text: 'Continue shopping',
            },
          ],
          type: 'h4',
        },
        {
          children: [
            {
              text: 'This is a custom layout building block ',
            },
            {
              type: 'link',
              linkType: 'custom',
              url: '/admin',
              children: [
                {
                  text: 'configured in the admin dashboard',
                },
              ],
            },
            {
              text: '.',
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
            label: 'Continue shopping',
            appearance: 'primary',
          },
        },
      ],
      blockName: 'CTA',
      blockType: 'cta',
    },
  ],
}
