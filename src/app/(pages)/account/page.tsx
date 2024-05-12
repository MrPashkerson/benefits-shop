import React from 'react'
import { Metadata } from 'next'

import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import AccountForm from './AccountForm'

import classes from './index.module.scss'

export default async function Account() {
  return (
    <div>
      <h5 className={classes.personalInfo}>Персональная информация</h5>
      <AccountForm />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Аккаунт',
  description: 'Управляйте своим аккаунтом и просматривайте историю заказов.',
  openGraph: mergeOpenGraph({
    title: 'Аккаунт',
    url: '/account',
  }),
}
