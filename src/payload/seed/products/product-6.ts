import type { Product } from '../../payload-types'

export const product6: Partial<Product> = {
  title: 'Промокод для ЯЕды 25р',
  slug: 'yandex-eats',
  meta: {
    description: 'Закажите еду из ресторанов и магазинов — с быстрой доставкой от 30 минут.',
    image: '{{PRODUCT_IMAGE}}',
  },
  price: 50,
  _status: 'published',
  layout: [],
  categories: '{{PRODUCT_CATEGORY}}',
  relatedProducts: [],
}
