import type { Product } from '../../payload-types'

export const product5: Partial<Product> = {
  title: 'Spotify 1 мес.',
  slug: 'spotify',
  meta: {
    description:
      'Spotify — это сервис для стриминга различного контента (миллионов треков, подкастов и видеороликов) от авторов со всего мира.',
    image: '{{PRODUCT_IMAGE}}',
  },
  price: 20,
  _status: 'published',
  layout: [],
  categories: '{{PRODUCT_CATEGORY}}',
  relatedProducts: [],
}
