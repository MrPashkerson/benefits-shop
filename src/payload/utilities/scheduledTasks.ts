import payload from 'payload'

export const creditUsers = async (): Promise<void> => {
  const getExperienceRange = (months: number): string => {
    if (months >= 60) return '5 years'
    if (months >= 24) return '2 years'
    if (months >= 12) return '1 year'
    if (months >= 6) return '6 months'
    if (months >= 3) return '3 months'
    return '1 month'
  }
  payload.logger.info('Crediting users...')
  try {
    const users = await payload.find({
      collection: 'users',
    })

    const settings = await payload.findGlobal({
      slug: 'limits-settings',
    })

    const {
      conversionRate,
      minBudget,
      maxBudget,
      qualificationCoefficients,
      experienceCoefficients,
    } = settings

    await Promise.all(
      users.docs.map(async user => {
        const userQualificationCoefficient =
          qualificationCoefficients.find(q => q.qualification === user.qualification)
            ?.coefficient || 0

        const hireDate = new Date(user.hireDate)
        const now = new Date()
        const monthsOfExperience =
          (now.getFullYear() - hireDate.getFullYear()) * 12 + now.getMonth() - hireDate.getMonth()

        const userExperienceCoefficient =
          experienceCoefficients.find(
            e => e.experienceRange === getExperienceRange(monthsOfExperience),
          )?.coefficient || 0

        const newCredits = Math.min(
          maxBudget * conversionRate,
          minBudget * conversionRate +
            minBudget * userQualificationCoefficient * conversionRate +
            minBudget * userExperienceCoefficient * conversionRate,
        )

        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            credits: (user.credits || 0) + +newCredits,
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
