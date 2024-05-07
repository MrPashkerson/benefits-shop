import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import adminsAndUser from './access/adminsAndUser'
import { checkRole } from './checkRole'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { loginAfterCreate } from './hooks/loginAfterCreate'
import { resolveDuplicatePurchases } from './hooks/resolveDuplicatePurchases'

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    plural: 'Пользователи',
    singular: 'документа',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  access: {
    read: adminsAndUser,
    create: admins,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  versions: {
    drafts: true,
    maxPerDoc: 0,
  },
  hooks: {
    afterChange: [loginAfterCreate],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      label: 'ФИО',
      type: 'text',
    },
    {
      name: 'credits',
      label: 'Баллы',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
      access: {
        create: () => false,
        update: () => false,
      },
    },
    {
      name: 'roles',
      label: 'Роли',
      type: 'select',
      hasMany: true,
      defaultValue: ['customer'],
      options: [
        {
          label: 'Администратор',
          value: 'admin',
        },
        {
          label: 'Пользователь',
          value: 'customer',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
    {
      name: 'purchases',
      label: 'Покупки',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      hooks: {
        beforeChange: [resolveDuplicatePurchases],
      },
    },
    {
      label: 'Корзина',
      name: 'cart',
      type: 'group',
      fields: [
        {
          name: 'items',
          label: 'Элементы',
          type: 'array',
          interfaceName: 'CartItems',
          fields: [
            {
              name: 'product',
              label: 'Льгота',
              type: 'relationship',
              relationTo: 'products',
            },
            {
              name: 'quantity',
              label: 'Количество',
              type: 'number',
              min: 0,
              admin: {
                step: 1,
              },
            },
          ],
        },
        // If you wanted to maintain a 'created on'
        // or 'last modified' date for the cart
        // you could do so here:
        // {
        //   name: 'createdOn',
        //   label: 'Created On',
        //   type: 'date',
        //   admin: {
        //     readOnly: true
        //   }
        // },
        // {
        //   name: 'lastModified',
        //   label: 'Last Modified',
        //   type: 'date',
        //   admin: {
        //     readOnly: true
        //   }
        // },
      ],
    },
    {
      name: 'skipSync',
      label: 'Пропустить синхронизацию',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
  ],
  timestamps: true,
}

export default Users
