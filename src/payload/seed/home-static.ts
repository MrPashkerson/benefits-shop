import type { Page } from '../payload-types'

export const staticHome: Page = {
  id: '',
  title: 'Home',
  slug: 'home',
  createdAt: '',
  updatedAt: '',
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
      richText: [
        {
          children: [
            {
              text: 'Выполните настройку базы данных',
            },
          ],
          type: 'h4',
        },
        {
          children: [
            {
              text: 'На данный момент база данных пуста. Заполните её в ',
            },
            {
              type: 'link',
              linkType: 'custom',
              url: '/admin',
              children: [
                {
                  text: 'панели администратора',
                },
              ],
            },
            {
              text: ', нажав на "Нажмите сюда, чтобы произвести первичную настройку панели админитсратора".',
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
      blockName: 'CTA',
      blockType: 'cta',
    },
  ],
}
