'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { Settings } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'

export const LogoutPage: React.FC<{
  settings: Settings
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('Выход выполнен успешно.')
      } catch (_) {
        setError('Вы уже вышли из аккаунта.')
      }
    }

    performLogout()
  }, [logout])

  return (
    <Fragment>
      {(error || success) && (
        <div>
          <h1>{error || success}</h1>
          <p>
            {'Что хотите делать дальше?'}
            {typeof productsPage === 'object' && productsPage?.slug && (
              <Fragment>
                {' '}
                <Link href={`/${productsPage.slug}`}>Нажмите сюда</Link>
                {`, чтобы перейти в магазин.`}
              </Fragment>
            )}
            {` Чтобы войти в аккаунт, `}
            <Link href="/login">нажмите сюда</Link>
            {'.'}
          </p>
        </div>
      )}
    </Fragment>
  )
}
