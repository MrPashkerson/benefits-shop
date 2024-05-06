import type { GlobalConfig } from 'payload/types'

import link from '../fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Подвал',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'copyright',
      label: 'Авторские права',
      type: 'text',
      defaultValue: '© Все права защищены 2024',
    },
    {
      name: 'navItems',
      label: 'Навигационная панель',
      type: 'array',
      maxRows: 6,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
}
