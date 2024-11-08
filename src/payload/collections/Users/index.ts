import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import ResetPasswordEmail from '../../components/ResetPasswordEmail'
import adminsAndUser from './access/adminsAndUser'
import { checkRole } from './checkRole'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { ensureManagerIsAdmin } from './hooks/ensureManagerIsAdmin'
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
  auth: {
    forgotPassword: {
      generateEmailHTML: ({ req, token, user }) => {
        return ResetPasswordEmail({ req, token, user })
      },
      generateEmailSubject: () => {
        return `Сброс пароля в сервисе Магазин Льгот!`
      },
    },
  },
  fields: [
    {
      name: 'name',
      label: 'ФИО',
      required: true,
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
        {
          label: 'Менеджер',
          value: 'manager',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin, ensureManagerIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
    {
      name: 'hireDate',
      label: 'Дата найма',
      type: 'date',
      required: true,
    },
    {
      name: 'qualification',
      label: 'Квалификация',
      type: 'select',
      required: true,
      hasMany: false,
      options: [
        {
          label: 'Среднее общее образование (9 классов)',
          value: 'basicGeneralEducation',
        },
        {
          label: 'Среднее полное образование (11 классов)',
          value: 'secondarySchool',
        },
        {
          label: 'Среднее профессиональное образование',
          value: 'lowerPostSecondaryVocationalEducation',
        },
        {
          label: 'Незаконченное высшее образование',
          value: 'incompleteHigherEducation',
        },
        {
          label: 'Высшее образование (бакалавриат)',
          value: 'bachelorsDegree',
        },
        {
          label: 'Высшее образование (специалитет)',
          value: 'specialistDegree',
        },
        {
          label: 'Высшее образование (магистратура)',
          value: 'mastersDegree',
        },
        {
          label: 'Аспирантура/Докторантура',
          value: 'postgraduateDegreeOrPhD',
        },
        {
          label: 'Два и более высших образования',
          value: 'secondHigherDegree',
        },
      ],
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
