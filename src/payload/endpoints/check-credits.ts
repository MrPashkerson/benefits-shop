import type { PayloadHandler } from 'payload/config'

import type { CartItems } from '../payload-types'

export const checkCredits: PayloadHandler = async (req, res): Promise<void> => {
  const { user, payload } = req

  if (!user) {
    res.status(401).send('Неавторизованный пользователь')
    return
  }

  const fullUser = await payload.findByID({
    collection: 'users',
    id: user?.id,
  })

  if (!fullUser) {
    res.status(404).json({ error: 'Пользователь не найден' })
    return
  }

  try {
    let total = 0

    const hasItems = fullUser?.cart?.items?.length > 0

    if (!hasItems) {
      throw new Error('В корзине пусто')
    }

    await Promise.all(
      fullUser?.cart?.items?.map(async (item: CartItems[0]): Promise<null> => {
        const { product, quantity } = item

        if (!quantity) {
          return null
        }

        if (typeof product === 'string') {
          throw new Error(`Льгота ${product} не найдена`)
        }

        const price = product.price
        total += price * quantity

        return null
      }),
    )

    if (total === 0) {
      throw new Error('В корзине пусто, сперва добавьте что-нибудь.')
    }

    if (fullUser.credits < total) {
      res.status(400).json({ error: 'Недостаточно кредитов для завершения покупки' })
      return
    }

    const updatedCredits = fullUser.credits - total
    await payload.update({
      collection: 'users',
      id: user?.id,
      data: {
        credits: updatedCredits,
      },
    })

    res.status(200).json({ canProceed: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка'
    payload.logger.error(message)
    res.status(400).json({ error: message })
  }
}
