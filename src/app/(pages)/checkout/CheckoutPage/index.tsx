'use client'

import React, { Fragment, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import { useTheme } from '../../../_providers/Theme'
import { CheckoutForm } from '../CheckoutForm'
import { CheckoutItem } from '../CheckoutItem'

import classes from './index.module.scss'

export const CheckoutPage: React.FC<{
  settings: Settings
}> = props => {
  const {
    settings: { productsPage },
  } = props

  const { user } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const { cart, cartIsEmpty, cartTotal } = useCart()

  useEffect(() => {
    if (user !== null && cartIsEmpty) {
      router.push('/cart')
    }
  }, [router, user, cartIsEmpty])

  if (!user) return null

  return (
    <Fragment>
      <h3 className={classes.padding_bottom_40}>Детали заказа</h3>
      {cartIsEmpty && (
        <div className={classes.padding_bottom_40}>
          {'Ваша '}
          <Link href="/cart">корзина</Link>
          {' пуста.'}
        </div>
      )}
      {!cartIsEmpty && (
        <div className={classes.items}>
          <div className={classes.header}>
            <p>Льготы</p>
            <div className={classes.headerItemDetails}>
              <p></p>
              <p className={classes.quantity}>Количество</p>
            </div>
            <p className={classes.subtotal}>Промежуточный итог</p>
          </div>

          <ul>
            {cart?.items?.map((item, index) => {
              if (typeof item.product === 'object') {
                const {
                  quantity,
                  product,
                  product: { title, meta },
                } = item

                if (!quantity) return null

                const metaImage = meta?.image

                return (
                  <Fragment key={index}>
                    <CheckoutItem
                      product={product}
                      title={title}
                      metaImage={metaImage}
                      quantity={quantity}
                      index={index}
                    />
                  </Fragment>
                )
              }
              return null
            })}
            <div className={classes.orderTotal}>
              <p>Итого</p>
              <p>{cartTotal.formatted} б.</p>
            </div>
          </ul>

          <Fragment>
            {error && (
              <div className={classes.error}>
                <p>{`Ошибка: ${error}`}</p>
                <Button label="Назад в корзину" href="/cart" appearance="secondary" />
              </div>
            )}
            <CheckoutForm />
          </Fragment>
        </div>
      )}
      {cartIsEmpty && <Button label="Назад в корзину" href="/cart" appearance="secondary" />}
    </Fragment>
  )
}
