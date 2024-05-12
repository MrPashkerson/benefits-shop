import payload from 'payload'

export const creditUsers = async (): Promise<void> => {
  payload.logger.info('Crediting users...')
  try {
    const users = await payload.find({
      collection: 'users',
    })

    await Promise.all(
      users.docs.map(async user => {
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            credits: (user.credits || 0) + +process.env.AMOUNT_OF_CREDITS,
          },
        })
      }),
    )

    payload.logger.info('Credits updated successfully')
  } catch (error: unknown) {
    payload.logger.error('Failed to credit users:', error)
  }
}

export const resetCredits = async (): Promise<void> => {
  payload.logger.info('Resetting credits...')
  try {
    const users = await payload.find({
      collection: 'users',
    })

    await Promise.all(
      users.docs.map(async user => {
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            credits: 0,
          },
        })
      }),
    )

    payload.logger.info('Credits reset successfully.')
  } catch (error: unknown) {
    payload.logger.error('Failed to reset credits:', error)
  }
}
