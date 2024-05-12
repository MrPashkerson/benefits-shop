import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { OrderConfirmationPage } from './OrderConfirmationPage'

import classes from './index.module.scss'

export default async function OrderConfirmation() {
  return (
    <Gutter className={classes.confirmationPage}>
      <Suspense fallback={<div>Загрузка...</div>}>
        <OrderConfirmationPage />
      </Suspense>
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Подтверждение заказа',
  description: 'Ваш заказ подтвержден.',
  openGraph: mergeOpenGraph({
    title: 'Подтверждение заказа',
    url: '/order-confirmation',
  }),
}
