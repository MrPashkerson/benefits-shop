import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'
import { adminsOrOrderedBy } from './access/adminsOrOrderedBy'
import { clearUserCart } from './hooks/clearUserCart'
import { populateOrderedBy } from './hooks/populateOrderedBy'
import { updateUserPurchases } from './hooks/updateUserPurchases'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'документа',
    plural: 'Заказы',
  },
  admin: {
    useAsTitle: 'createdAt',
    defaultColumns: ['createdAt', 'orderedBy'],
    preview: doc => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
  },
  hooks: {
    afterChange: [updateUserPurchases, clearUserCart],
  },
  access: {
    read: adminsOrOrderedBy,
    update: admins,
    create: adminsOrLoggedIn,
    delete: admins,
  },
  fields: [
    {
      name: 'orderedBy',
      label: 'Заказано',
      type: 'relationship',
      relationTo: 'users',
      hooks: {
        beforeChange: [populateOrderedBy],
      },
    },
    {
      name: 'total',
      label: 'Итого',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'items',
      label: 'Элементы',
      type: 'array',
      fields: [
        {
          name: 'product',
          label: 'Льгота',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'price',
          label: 'Цена',
          type: 'number',
          min: 0,
        },
        {
          name: 'quantity',
          label: 'Количество',
          type: 'number',
          min: 0,
        },
      ],
    },
  ],
}
