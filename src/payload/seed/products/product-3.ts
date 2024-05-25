import type { Product } from '../../payload-types'

export const product3: Partial<Product> = {
  title: 'Барбершоп 50р',
  slug: 'barbershop50',
  meta: {
    description: 'Подарочный сертификат на посещение салона красоты.',
    image: '{{PRODUCT_IMAGE}}',
  },
  price: 100,
  realPrice: 100,
  _status: 'published',
  layout: [],
  categories: '{{PRODUCT_CATEGORY}}',
  relatedProducts: [],
}
