import type { Product } from '../../payload-types'

export const product4: Partial<Product> = {
  title: 'ЯПлюс 1 мес.',
  slug: 'yplus',
  meta: {
    description:
      'Смотрите фильмы на КиноПоиске, слушайте треки на Музыке, получайте и тратьте кешбэк баллами на сервисах Яндекса.',
    image: '{{PRODUCT_IMAGE}}',
  },
  price: 20,
  _status: 'published',
  layout: [],
  categories: '{{PRODUCT_CATEGORY}}',
  relatedProducts: [],
}
