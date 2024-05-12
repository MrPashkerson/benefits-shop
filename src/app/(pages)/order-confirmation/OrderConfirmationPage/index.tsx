'use client'

import React, { Fragment, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const OrderConfirmationPage: React.FC<{}> = () => {
  const searchParams = useSearchParams()
  const orderID = searchParams.get('order_id')
  const error = searchParams.get('error')

  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div>
      {error ? (
        <Fragment>
          <Message error={error} />
          <p>
            {`При обработке заказа произошла ошибка. Пожалуйста, свяжитесь с нами, чтобы решить эту проблему.`}
          </p>
          <div className={classes.actions}>
            <Button href="/account" label="Перейти к аккаунту" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`}
              label="Просмотреть все заказы"
              appearance="secondary"
            />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h1>Вы успешно оформили льготы!</h1>
          <p>
            {`Ваш заказ подтвержден. В ближайшее время вы получите подтверждение по электронной почте. Ваш идентификатор заказа - ${orderID}.`}
          </p>
          <div className={classes.actions}>
            <Button
              href={`/account/orders/${orderID}`}
              label="Просмотреть заказ"
              appearance="primary"
            />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/account/orders`}
              label="Просмотреть все заказы"
              appearance="secondary"
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}
