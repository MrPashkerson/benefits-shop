import type { Product } from '../../payload-types'

export const product9: Partial<Product> = {
  title: 'Топливная карта 60р',
  slug: 'fuel-card',
  meta: {
    description: 'Пополнение топливной карты.',
    image: '{{PRODUCT_IMAGE}}',
  },
  price: 120,
  realPrice: 120,
  _status: 'published',
  layout: [],
  categories: '{{PRODUCT_CATEGORY}}',
  relatedProducts: [],
}
