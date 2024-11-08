import type { Page } from '../payload-types'

export const staticCart: Page = {
  id: '',
  title: 'Корзина',
  slug: 'cart',
  createdAt: '',
  updatedAt: '',
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
          {
            text: 'В вашей базе данных ещё нет страницы корзины.',
            bold: true,
          },
          {
            text: 'В данный момент вы видите демонстрационную страницу. Чтобы управлять содержимым этой страницы, ',
          },
          {
            type: 'link',
            linkType: 'custom',
            url: '/admin',
            children: [
              {
                text: 'зайдите в панель управления',
              },
            ],
          },
          {
            text: ' и нажмите на надпись "Нажмите сюда, чтобы произвести первичную настройку панели админитсратора".',
          },
          {
            text: 'После этого вам может потребоваться перезайти на страницу страницу, чтобы очистить кэшированный запрос.',
            bold: true,
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
              text: 'Создайте страницу корзины',
            },
          ],
          type: 'h4',
        },
        {
          children: [
            {
              text: 'В вашей базе данных еще нет страницы корзины. Чтобы её добавить, ',
            },
            {
              type: 'link',
              linkType: 'custom',
              url: '/admin',
              children: [
                {
                  text: 'перейдите в панель управления',
                },
              ],
            },
            {
              text: ' и нажмите на надпись "Нажмите сюда, чтобы произвести первичную настройку панели админитсратора".',
            },
          ],
        },
      ],
      links: [
        {
          link: {
            type: 'custom',
            url: '/admin',
            label: 'Панель управления',
            appearance: 'primary',
            reference: null,
          },
        },
      ],
      blockName: '',
      blockType: 'cta',
    },
  ],
}
