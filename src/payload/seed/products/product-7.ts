import type { Product } from '../../payload-types'

export const product7: Partial<Product> = {
  title: 'Абонемент в спортзал 1 мес.',
  slug: 'sport-pass',
  meta: {
    description: 'Абонемент в спортивный зал на 1 месяц.',
    image: '{{PRODUCT_IMAGE}}',
  },
  price: 150,
  realPrice: 150,
  _status: 'published',
  layout: [],
  categories: '{{PRODUCT_CATEGORY}}',
  relatedProducts: [],
}
