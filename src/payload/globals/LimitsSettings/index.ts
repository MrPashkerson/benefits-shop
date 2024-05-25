import type { GlobalConfig } from 'payload/types'

import { managers } from '../../access/managers'
import { updateCreditsPriceAll } from './hooks/updateCreditsPriceAll'

const LimitsSettings: GlobalConfig = {
  slug: 'limits-settings',
  label: 'Настройки баллов и лимитов',
  hooks: {
    afterChange: [updateCreditsPriceAll],
  },
  access: {
    read: managers,
    update: managers,
  },
  fields: [
    {
      name: 'title',
      label: 'Баллы начисляются каждый месяц и сбрасываются каждый год в ночь на 1 января',
      type: 'text',
      hidden: true,
    },
    {
      name: 'formula',
      label: 'Формула расчёта начисления баллов',
      type: 'text',
      defaultValue:
        'min(maxCredits, minCredits + (minCredits * Коэффициент квалификации) + (minCredits * Коэффициент стажа))',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'conversionRate',
      label: 'Сколько рублей стоит один балл',
      type: 'number',
      required: true,
      min: 1,
      defaultValue: 1,
    },
    {
      name: 'minBudget',
      label: 'Минимальный бюджет на сотрудника в месяц',
      type: 'number',
      required: true,
    },
    {
      name: 'maxBudget',
      label: 'Максимальный бюджет на сотрудника в месяц',
      type: 'number',
      required: true,
    },
    {
      name: 'qualificationCoefficients',
      label: 'Коэффециенты для различных уровней квалификации',
      type: 'array',
      fields: [
        {
          name: 'qualification',
          label: 'Квалификация',
          type: 'select',
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
            read: managers,
            create: managers,
            update: managers,
          },
        },
        {
          name: 'coefficient',
          label: 'Коэффициент',
          type: 'number',
          // required: true,
          min: 0,
          max: 1,
          validate: value => {
            if (value < 0 || value > 1) {
              return 'Коэффициент должен быть от 0 до 1'
            }
            return true
          },
        },
      ],
    },
    {
      name: 'experienceCoefficients',
      label: 'Коэффициенты для стажа работы в компании',
      type: 'array',
      fields: [
        {
          name: 'experienceRange',
          label: 'Стаж работы в компании',
          type: 'select',
          options: [
            { label: '1 месяц', value: '1 month' },
            { label: '3 месяца', value: '3 months' },
            { label: '6 месяцев', value: '6 months' },
            { label: '1 год', value: '1 year' },
            { label: '2 года', value: '2 years' },
            { label: '5 лет', value: '5 years' },
          ],
          // required: true,
        },
        {
          name: 'coefficient',
          label: 'Коэффициент',
          type: 'number',
          required: true,
          min: 0,
          max: 1,
          admin: {
            step: 0.1,
          },
          validate: value => {
            if (value < 0 || value > 1) {
              return 'Коэффициент должен быть от 0 до 1'
            }
            return true
          },
        },
      ],
    },
    {
      name: 'skipSync',
      label: 'Пропустить синхронизацию',
      type: 'checkbox',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
  ],
}

export default LimitsSettings
