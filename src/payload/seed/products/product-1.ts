import type { Product } from '../../payload-types'

export const product1: Partial<Product> = {
  title: 'Оплата мобильной связи 20р',
  slug: 'mob20',
  _status: 'published',
  meta: {
    description: 'Платите за мобильный телефон, городской или IP.',
    image: '{{PRODUCT_IMAGE}}',
  },
  layout: [],
  price: 40,
  relatedProducts: [],
}
