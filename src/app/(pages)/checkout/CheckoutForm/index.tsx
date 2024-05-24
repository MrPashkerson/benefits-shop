'use client'

import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const CheckoutForm: React.FC<{}> = () => {
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const { cart, cartTotal } = useCart()
  const { updateUserCredits } = useAuth()

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault()
      setIsLoading(true)

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/check-credits`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            total: cartTotal.raw,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          setIsLoading(false)
          throw new Error(data.error || 'Ошибка при проверке кредитов')
        }

        if (data.canProceed) {
          // Before redirecting to the order confirmation page, we need to create the order in Payload
          // Cannot clear the cart yet because if you clear the cart while in the checkout
          // you will be redirected to the `/cart` page before this redirect happens
          // Instead, we clear the cart in an `afterChange` hook on the `orders` collection in Payload
          try {
            const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                total: cartTotal.raw,
                items: (cart?.items || [])?.map(({ product, quantity }) => ({
                  product: typeof product === 'string' ? product : product.id,
                  quantity,
                  price: typeof product === 'object' ? product.price : undefined,
                })),
              }),
            })

            if (!orderReq.ok)
              throw new Error(orderReq.statusText || 'Что-то пошло не так при создании заказа.')

            const orderRes = await orderReq.json()
            updateUserCredits()
            router.push(`/order-confirmation?order_id=${orderRes.doc.id}`)
          } catch (err) {
            // don't throw an error if the order was not created successfully
            // this is because payment _did_ in fact go through, and we don't want the user to pay twice
            console.error(err.message) // eslint-disable-line no-console
            router.push(`/order-confirmation?error=${encodeURIComponent(err.message)}`)
          }
        } else {
          throw new Error('Недостаточно баллов для завершения покупки')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    },
    [router, cart, cartTotal, updateUserCredits],
  )

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      {error && <Message error={error} />}
      <div className={classes.actions}>
        <Button label="Назад в корзину" href="/cart" appearance="secondary" />
        <Button
          label={isLoading ? 'Обработка...' : 'Оформить'}
          type="submit"
          appearance="primary"
          disabled={isLoading}
        />
      </div>
    </form>
  )
}

export default CheckoutForm
