import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { ResetPasswordForm } from './ResetPasswordForm'

import classes from './index.module.scss'

export default async function ResetPassword() {
  return (
    <Gutter className={classes.resetPassword}>
      <h1>Сброс пароля</h1>
      <p className={classes.margin_bottom_30}>Пожалуйста, введите новый пароль ниже.</p>
      <ResetPasswordForm />
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Сброс пароля',
  description: 'Введите новый пароль.',
  openGraph: mergeOpenGraph({
    title: 'Сброс пароля',
    url: '/reset-password',
  }),
}
