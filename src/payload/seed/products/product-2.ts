import type { Product } from '../../payload-types'

export const product2: Partial<Product> = {
  title: 'ДМС',
  slug: 'medins',
  meta: {
    description:
      'Полис ДМС позволит вам пользоваться качественной медицинской помощью, включая поликлиническое обслуживание, телемедицину, скорую помощь и экстренную госпитализацию в лучших клиниках и стационарах.',
    image: '{{PRODUCT_IMAGE}}',
  },
  price: 200,
  realPrice: 200,
  _status: 'published',
  layout: [],
  categories: '{{PRODUCT_CATEGORY}}',
  relatedProducts: [],
}
