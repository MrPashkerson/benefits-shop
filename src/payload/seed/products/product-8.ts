import type { Product } from '../../payload-types'

export const product8: Partial<Product> = {
  title: 'Проездной на 30 дн.',
  slug: 'transport-pass',
  meta: {
    description: 'Проездной на все виды транспорта на 30 дней.',
    image: '{{PRODUCT_IMAGE}}',
  },
  price: 80,
  _status: 'published',
  layout: [],
  categories: '{{PRODUCT_CATEGORY}}',
  relatedProducts: [],
}
