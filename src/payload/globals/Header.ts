import type { GlobalConfig } from 'payload/types'

import link from '../fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Заголовок',
  access: {
    read: () => true,
  },
  fields: [
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
